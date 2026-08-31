import type { DiagnosticsInput, HealthCheck } from './types';

/**
 * Pure health-check logic. No I/O: takes a measured snapshot and returns
 * an ordered list of pass/warn/fail checks with actionable hints.
 */
export function runHealthChecks(input: DiagnosticsInput): HealthCheck[] {
  const checks: HealthCheck[] = [];
  const { settings, permission, deviceCount, measuredFps, luminance, secure } = input;

  // Secure context
  checks.push(
    secure
      ? { id: 'secure', status: 'pass', label: 'Secure connection' }
      : {
          id: 'secure',
          status: 'fail',
          label: 'Insecure connection',
          hint: 'Camera access needs HTTPS or localhost.',
        },
  );

  // Permission
  if (permission === 'denied') {
    checks.push({
      id: 'permission',
      status: 'fail',
      label: 'Camera permission blocked',
      hint: 'Allow camera access from the address-bar icon, then reload.',
    });
  } else if (permission === 'granted' || settings) {
    checks.push({ id: 'permission', status: 'pass', label: 'Camera permission granted' });
  } else {
    checks.push({
      id: 'permission',
      status: 'warn',
      label: 'Awaiting camera permission',
      hint: 'Click “Start test” and allow access when prompted.',
    });
  }

  // Device presence
  checks.push(
    deviceCount > 0
      ? {
          id: 'device',
          status: 'pass',
          label: deviceCount === 1 ? '1 camera detected' : `${deviceCount} cameras detected`,
        }
      : {
          id: 'device',
          status: 'fail',
          label: 'No camera detected',
          hint: 'Connect a webcam or enable your built-in camera.',
        },
  );

  // Resolution
  if (settings) {
    const px = Math.min(settings.width, settings.height);
    if (px >= 720) {
      checks.push({
        id: 'resolution',
        status: 'pass',
        label: `Good resolution (${settings.width}×${settings.height})`,
      });
    } else if (px >= 480) {
      checks.push({
        id: 'resolution',
        status: 'warn',
        label: `Standard resolution (${settings.width}×${settings.height})`,
        hint: 'HD (720p+) looks noticeably sharper on calls.',
      });
    } else {
      checks.push({
        id: 'resolution',
        status: 'fail',
        label: `Low resolution (${settings.width}×${settings.height})`,
        hint: 'Try a different camera or check your camera settings.',
      });
    }
  }

  // FPS
  if (measuredFps !== null) {
    if (measuredFps >= 24) {
      checks.push({
        id: 'fps',
        status: 'pass',
        label: `Smooth frame rate (${Math.round(measuredFps)} fps)`,
      });
    } else if (measuredFps >= 15) {
      checks.push({
        id: 'fps',
        status: 'warn',
        label: `Moderate frame rate (${Math.round(measuredFps)} fps)`,
        hint: 'Close heavy apps or improve lighting to raise frame rate.',
      });
    } else {
      checks.push({
        id: 'fps',
        status: 'fail',
        label: `Low frame rate (${Math.round(measuredFps)} fps)`,
        hint: 'Poor lighting or a busy CPU often causes low frame rates.',
      });
    }
  }

  // Lighting (optional heuristic)
  if (typeof luminance === 'number') {
    if (luminance < 0.18) {
      checks.push({
        id: 'lighting',
        status: 'warn',
        label: 'Low lighting detected',
        hint: 'Face a light source so your camera can expose your face properly.',
      });
    } else if (luminance > 0.9) {
      checks.push({
        id: 'lighting',
        status: 'warn',
        label: 'Overexposed / very bright',
        hint: 'Reduce backlight or bright light directly behind you.',
      });
    } else {
      checks.push({ id: 'lighting', status: 'pass', label: 'Lighting looks good' });
    }
  }

  return checks;
}

/** Draw a downscaled frame to a canvas and return average luminance 0..1. */
export function sampleLuminance(video: HTMLVideoElement): number | null {
  const w = 64;
  const h = 48;
  if (!video.videoWidth) return null;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) return null;
  ctx.drawImage(video, 0, 0, w, h);
  try {
    const { data } = ctx.getImageData(0, 0, w, h);
    let sum = 0;
    const pixels = w * h;
    for (let i = 0; i < data.length; i += 4) {
      // Rec. 601 luma
      sum += 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
    }
    return sum / (pixels * 255);
  } catch {
    // Cross-origin / tainted canvas, so bail gracefully.
    return null;
  }
}
