// Per-frame image analysis. Everything runs on a downscaled copy of the current
// video frame in a canvas, so no pixels leave the device.

export interface ImageStats {
  /** Mean Rec. 601 luma, 0..1. Drives the lighting health check. */
  luminance: number;
  /** Mean HSV value (the brightest channel), 0..100. */
  brightness: number;
  /** Mean HSL lightness, (max + min) / 2, as a percentage, 0..100. */
  lightness: number;
  /** Mean Rec. 709 relative luminance, 0..100. */
  luminosity: number;
  /** RMS contrast (std-dev of luma), 0..100. */
  contrast: number;
  /** Mean HSV saturation, 0..100. */
  saturation: number;
  /** Hue of the average colour, in degrees 0..360. */
  hue: number;
  /** Mean colour of the frame, 0..255 per channel. */
  avg: { r: number; g: number; b: number };
  /** Mean colour as `#rrggbb`. */
  hex: string;
  /** True when the frame carries almost no colour, as with a mono or IR sensor. */
  mono: boolean;
  /** Distinct colours in the sampled frame (approximate: the sample is downscaled). */
  colors: number;
  /** Pixels examined, so a caller can say what "approximate" means. */
  sampled: number;
}

/** Reused offscreen canvas; allocating one per frame would thrash the GC. */
let scratch: HTMLCanvasElement | null = null;

/**
 * Sample the current video frame and derive its brightness, contrast, saturation,
 * average colour and an approximate colour count. Returns null before the first
 * frame has decoded.
 *
 * The frame is drawn at `w`×`h` (default 160×90) rather than full resolution:
 * the statistics are indistinguishable and it keeps the work off the critical path.
 */
export function sampleImageStats(
  video: HTMLVideoElement,
  w = 160,
  h = 90,
): ImageStats | null {
  if (!video.videoWidth || !video.videoHeight) return null;

  scratch ??= document.createElement('canvas');
  scratch.width = w;
  scratch.height = h;
  const ctx = scratch.getContext('2d', { willReadFrequently: true });
  if (!ctx) return null;

  try {
    ctx.drawImage(video, 0, 0, w, h);
  } catch {
    return null; // frame not ready
  }

  let data: Uint8ClampedArray;
  try {
    data = ctx.getImageData(0, 0, w, h).data;
  } catch {
    return null; // tainted canvas, should not happen for a local camera
  }

  const n = w * h;
  const seen = new Set<number>();
  let sum = 0;
  let sumSq = 0;
  let satSum = 0;
  let valSum = 0;
  let lightSum = 0;
  let relSum = 0;
  let rSum = 0;
  let gSum = 0;
  let bSum = 0;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    // Rec. 601 luma, matching how the eye weights the channels.
    const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    sum += lum;
    sumSq += lum * lum;

    // Rec. 709 relative luminance: the sRGB/WCAG definition, and a different
    // number from 601 luma, which is why both are reported.
    relSum += (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;

    const max = r > g ? (r > b ? r : b) : g > b ? g : b;
    const min = r < g ? (r < b ? r : b) : g < b ? g : b;
    satSum += max === 0 ? 0 : (max - min) / max;
    valSum += max / 255;
    lightSum += (max + min) / 510;

    rSum += r;
    gSum += g;
    bSum += b;

    seen.add((r << 16) | (g << 8) | b);
  }

  const mean = sum / n;
  const variance = Math.max(0, sumSq / n - mean * mean);
  const avg = {
    r: Math.round(rSum / n),
    g: Math.round(gSum / n),
    b: Math.round(bSum / n),
  };
  const saturation = round1((satSum / n) * 100);

  return {
    luminance: mean,
    brightness: round1((valSum / n) * 100),
    lightness: round1((lightSum / n) * 100),
    luminosity: round1((relSum / n) * 100),
    contrast: round1(Math.sqrt(variance) * 100),
    saturation,
    hue: hueOf(avg.r, avg.g, avg.b),
    avg,
    hex: toHex(avg.r, avg.g, avg.b),
    // Below ~2% every channel is within a couple of levels of the others, which is
    // a greyscale or infrared sensor rather than a washed-out colour one.
    mono: saturation < 2,
    colors: seen.size,
    sampled: n,
  };
}

/**
 * Blend a fresh sample into the previous one.
 *
 * A webcam's auto-exposure and auto-white-balance never settle, so raw per-frame
 * numbers twitch by a percentage point or two every sample and the panel reads as
 * unstable. Hue is recomputed from the blended average colour rather than blended
 * directly, because averaging 359° with 1° gives 180°, the opposite hue.
 */
export function blendStats(prev: ImageStats | null, next: ImageStats, alpha = 0.45): ImageStats {
  if (!prev) return next;
  const mix = (a: number, b: number) => a + (b - a) * alpha;
  const avg = {
    r: Math.round(mix(prev.avg.r, next.avg.r)),
    g: Math.round(mix(prev.avg.g, next.avg.g)),
    b: Math.round(mix(prev.avg.b, next.avg.b)),
  };
  const saturation = round1(mix(prev.saturation, next.saturation));
  return {
    luminance: mix(prev.luminance, next.luminance),
    brightness: round1(mix(prev.brightness, next.brightness)),
    lightness: round1(mix(prev.lightness, next.lightness)),
    luminosity: round1(mix(prev.luminosity, next.luminosity)),
    contrast: round1(mix(prev.contrast, next.contrast)),
    saturation,
    hue: hueOf(avg.r, avg.g, avg.b),
    avg,
    hex: toHex(avg.r, avg.g, avg.b),
    mono: saturation < 2,
    colors: Math.round(mix(prev.colors, next.colors)),
    sampled: next.sampled,
  };
}

/** Hue of a single colour, in degrees. Grey returns 0. */
export function hueOf(r: number, g: number, b: number): number {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  if (d === 0) return 0;
  let hue: number;
  if (max === r) hue = ((g - b) / d) % 6;
  else if (max === g) hue = (b - r) / d + 2;
  else hue = (r - g) / d + 4;
  hue *= 60;
  return Math.round(hue < 0 ? hue + 360 : hue);
}

export function toHex(r: number, g: number, b: number): string {
  return `#${[r, g, b].map((v) => v.toString(16).padStart(2, '0')).join('')}`;
}

function round1(v: number): number {
  return Math.round(v * 10) / 10;
}
