// Derivations behind the "Webcam Information" panel. Everything here is pure
// formatting or a read of already-measured values. No capture happens in here.

import type { ImageStats } from './imagestats';

/** Broadcast name for a frame size, from its height. */
export function videoStandard(w: number, h: number): string {
  if (!w || !h) return '-';
  const lines = Math.min(w, h); // portrait phone cameras report the short side second
  if (lines >= 2160) return '4K UHD';
  if (lines >= 1440) return 'QHD';
  if (lines >= 1080) return 'Full HD';
  if (lines >= 720) return 'HD';
  if (lines >= 480) return 'SD';
  return 'Low resolution';
}

export interface QualityInput {
  width: number;
  height: number;
  fps: number | null;
  stats: ImageStats | null;
}

export interface Quality {
  /** 0..5, in half steps. */
  score: number;
  label: string;
}

/**
 * A single headline score, so the panel opens with an answer rather than a table.
 *
 * Resolution and frame rate carry most of the weight because they are what the
 * camera can never make up for; lighting is a third of the score because it is
 * the part the user can actually fix in the next thirty seconds.
 */
export function qualityRating({ width, height, fps, stats }: QualityInput): Quality {
  const lines = Math.min(width, height);
  let score = 0;

  // Resolution: 0..2
  if (lines >= 1080) score += 2;
  else if (lines >= 720) score += 1.5;
  else if (lines >= 480) score += 1;
  else if (lines > 0) score += 0.5;

  // Frame rate: 0..1.5. Falls back to the resolution tier when unmeasured, so a
  // camera is never marked down for a number we have not collected yet.
  if (fps === null) score += lines >= 720 ? 1 : 0.5;
  else if (fps >= 28) score += 1.5;
  else if (fps >= 22) score += 1;
  else if (fps >= 15) score += 0.5;

  // Exposure and contrast: 0..1.5
  if (stats) {
    const lum = stats.luminance;
    if (lum >= 0.3 && lum <= 0.72) score += 1;
    else if (lum >= 0.18 && lum <= 0.85) score += 0.5;
    if (stats.contrast >= 12) score += 0.5;
  } else {
    score += 0.75;
  }

  score = Math.max(0.5, Math.min(5, Math.round(score * 2) / 2));
  const label =
    score >= 4.5 ? 'Excellent' : score >= 3.5 ? 'Very good' : score >= 2.5 ? 'Good' : score >= 1.5 ? 'Fair' : 'Poor';
  return { score, label };
}

/** Colour model of the incoming frames, as far as the pixels reveal it. */
export function imageMode(stats: ImageStats | null): string {
  if (!stats) return '-';
  return stats.mono ? 'Greyscale · 8-bit' : 'RGB colour · 24-bit';
}

/** Human name for the container/codec this browser would encode the stream with. */
export function streamType(mimeType: string | null): string {
  if (!mimeType) return 'Live video';
  const container = /mp4/i.test(mimeType) ? 'MP4' : /webm/i.test(mimeType) ? 'WebM' : mimeType.split(';')[0];
  const codec = /vp9/i.test(mimeType)
    ? 'VP9'
    : /vp8/i.test(mimeType)
      ? 'VP8'
      : /av01/i.test(mimeType)
        ? 'AV1'
        : /mp4/i.test(mimeType)
          ? 'H.264'
          : '';
  return codec ? `Live · ${container}/${codec}` : `Live · ${container}`;
}

export type BuiltIn = 'yes' | 'no' | 'unknown';

export interface BuiltIns {
  microphone: BuiltIn;
  speaker: BuiltIn;
  /** Label of the matched device, when there is one. */
  microphoneLabel: string;
  speakerLabel: string;
}

const UNKNOWN_BUILT_INS: BuiltIns = {
  microphone: 'unknown',
  speaker: 'unknown',
  microphoneLabel: '',
  speakerLabel: '',
};

/**
 * Does the selected camera carry its own microphone or speaker?
 *
 * Browsers group the inputs and outputs of one physical device under a shared
 * `groupId`, so a webcam with a built-in mic exposes an audioinput in the same
 * group. The grouping is only populated once permission has been granted, and
 * Firefox does not enumerate audio outputs at all, so both cases answer "unknown"
 * rather than guessing "no".
 */
export async function detectBuiltIns(cameraDeviceId?: string): Promise<BuiltIns> {
  if (!navigator.mediaDevices?.enumerateDevices) return UNKNOWN_BUILT_INS;

  let devices: MediaDeviceInfo[];
  try {
    devices = await navigator.mediaDevices.enumerateDevices();
  } catch {
    return UNKNOWN_BUILT_INS;
  }

  const cameras = devices.filter((d) => d.kind === 'videoinput');
  const camera = (cameraDeviceId && cameras.find((d) => d.deviceId === cameraDeviceId)) || cameras[0];
  if (!camera?.groupId) return UNKNOWN_BUILT_INS;

  const inGroup = (kind: MediaDeviceKind) =>
    devices.find((d) => d.kind === kind && d.groupId === camera.groupId);

  const mic = inGroup('audioinput');
  const speaker = inGroup('audiooutput');
  const outputsVisible = devices.some((d) => d.kind === 'audiooutput');

  return {
    microphone: mic ? 'yes' : 'no',
    speaker: outputsVisible ? (speaker ? 'yes' : 'no') : 'unknown',
    microphoneLabel: mic?.label ?? '',
    speakerLabel: speaker?.label ?? '',
  };
}

/** kbps → the MB/s figure people recognise from camera spec sheets. */
export function formatMBs(kbps: number | null): string {
  if (!kbps) return '-';
  return `${(kbps / 8 / 1000).toFixed(2)} MB/s`;
}

/** Byte count → kB, the unit a single encoded frame lives in. */
export function formatKB(bytes: number | null): string {
  if (!bytes) return '-';
  if (bytes >= 1_000_000) return `${(bytes / 1_000_000).toFixed(2)} MB`;
  return `${(bytes / 1000).toFixed(2)} kB`;
}
