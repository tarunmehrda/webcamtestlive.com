// Per-frame image analysis. Everything runs on a downscaled copy of the current
// video frame in a canvas — no pixels leave the device.

export interface ImageStats {
  /** Mean luminance, 0..1. */
  luminance: number;
  /** Mean luminance as a percentage, 0..100. */
  brightness: number;
  /** RMS contrast (std-dev of luminance), 0..100. */
  contrast: number;
  /** Mean HSV saturation, 0..100. */
  saturation: number;
  /** Distinct colours in the sampled frame (approximate — the sample is downscaled). */
  colors: number;
}

/** Reused offscreen canvas — allocating one per frame would thrash the GC. */
let scratch: HTMLCanvasElement | null = null;

/**
 * Sample the current video frame and derive brightness, contrast, saturation and
 * an approximate colour count. Returns null before the first frame has decoded.
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
    return null; // tainted canvas — should not happen for a local camera
  }

  const n = w * h;
  const seen = new Set<number>();
  let sum = 0;
  let sumSq = 0;
  let satSum = 0;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    // Rec. 601 luma, matching how the eye weights the channels.
    const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    sum += lum;
    sumSq += lum * lum;

    const max = r > g ? (r > b ? r : b) : g > b ? g : b;
    const min = r < g ? (r < b ? r : b) : g < b ? g : b;
    satSum += max === 0 ? 0 : (max - min) / max;

    seen.add((r << 16) | (g << 8) | b);
  }

  const mean = sum / n;
  const variance = Math.max(0, sumSq / n - mean * mean);

  return {
    luminance: mean,
    brightness: round1(mean * 100),
    contrast: round1(Math.sqrt(variance) * 100),
    saturation: round1((satSum / n) * 100),
    colors: seen.size,
  };
}

function round1(v: number): number {
  return Math.round(v * 10) / 10;
}
