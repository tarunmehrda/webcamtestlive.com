import type { MediaError, StreamSettings } from './types';
import { assertMediaSupport } from './devices';

export interface WebcamOptions {
  deviceId?: string;
  width?: number;
  height?: number;
  facingMode?: string;
}

export interface WebcamSession {
  readonly stream: MediaStream;
  attach(video: HTMLVideoElement): Promise<void>;
  getSettings(): StreamSettings;
  measureFps(video: HTMLVideoElement, onSample: (fps: number) => void): () => void;
  stop(): void;
}

/** Map a getUserMedia DOMException to a friendly, actionable MediaError. */
export function normalizeError(e: unknown): MediaError {
  const name = (e as DOMException)?.name ?? '';
  switch (name) {
    case 'NotAllowedError':
    case 'SecurityError':
      return {
        kind: 'not-allowed',
        message:
          'Camera permission was blocked. Click the camera icon in your browser’s address bar and allow access, then try again.',
        cause: e,
      };
    case 'NotFoundError':
    case 'DevicesNotFoundError':
      return {
        kind: 'not-found',
        message: 'No camera was found. Make sure a webcam is connected and enabled.',
        cause: e,
      };
    case 'NotReadableError':
    case 'TrackStartError':
      return {
        kind: 'not-readable',
        message:
          'Your camera is in use by another app (Zoom, Teams, etc.). Close it and try again.',
        cause: e,
      };
    case 'OverconstrainedError':
    case 'ConstraintNotSatisfiedError':
      return {
        kind: 'overconstrained',
        message: 'The requested camera settings are not supported by this device.',
        cause: e,
      };
    default:
      return {
        kind: 'unknown',
        message: (e as Error)?.message || 'An unknown error occurred while accessing the camera.',
        cause: e,
      };
  }
}

function buildConstraints(opts?: WebcamOptions): MediaStreamConstraints {
  const video: MediaTrackConstraints = {};
  if (opts?.deviceId) video.deviceId = { exact: opts.deviceId };
  if (opts?.facingMode) video.facingMode = opts.facingMode;
  if (opts?.width) video.width = { ideal: opts.width };
  if (opts?.height) video.height = { ideal: opts.height };
  return { video: Object.keys(video).length ? video : true, audio: false };
}

class Session implements WebcamSession {
  constructor(readonly stream: MediaStream) {}

  async attach(video: HTMLVideoElement): Promise<void> {
    video.srcObject = this.stream;
    video.muted = true;
    video.playsInline = true;
    video.setAttribute('playsinline', '');
    try {
      await video.play();
    } catch {
      // Autoplay can reject if not muted; we already mute, so ignore transient errors.
    }
  }

  getSettings(): StreamSettings {
    const track = this.stream.getVideoTracks()[0];
    const s = track?.getSettings() ?? {};
    const width = s.width ?? 0;
    const height = s.height ?? 0;
    return {
      width,
      height,
      frameRate: s.frameRate ?? 0,
      aspectRatio: height ? width / height : 0,
      megapixels: (width * height) / 1_000_000,
      facingMode: s.facingMode,
      deviceLabel: track?.label ?? '',
    };
  }

  /** Live FPS via requestVideoFrameCallback when available, else rAF frame counting. */
  measureFps(video: HTMLVideoElement, onSample: (fps: number) => void): () => void {
    let frames = 0;
    let windowStart = performance.now();
    let active = true;
    let rvfcHandle = 0;
    let rafHandle = 0;

    const emit = (now: number) => {
      const elapsed = now - windowStart;
      if (elapsed >= 1000) {
        onSample((frames * 1000) / elapsed);
        frames = 0;
        windowStart = now;
      }
    };

    const hasRvfc = typeof (video as any).requestVideoFrameCallback === 'function';

    if (hasRvfc) {
      const loop = (now: number) => {
        if (!active) return;
        frames++;
        emit(now);
        rvfcHandle = (video as any).requestVideoFrameCallback(loop);
      };
      rvfcHandle = (video as any).requestVideoFrameCallback(loop);
    } else {
      const loop = () => {
        if (!active) return;
        frames++;
        emit(performance.now());
        rafHandle = requestAnimationFrame(loop);
      };
      rafHandle = requestAnimationFrame(loop);
    }

    return () => {
      active = false;
      if (rafHandle) cancelAnimationFrame(rafHandle);
      if (rvfcHandle && typeof (video as any).cancelVideoFrameCallback === 'function') {
        (video as any).cancelVideoFrameCallback(rvfcHandle);
      }
    };
  }

  stop(): void {
    this.stream.getTracks().forEach((t) => t.stop());
  }
}

/** Start a camera stream. Throws a normalized MediaError on failure. */
export async function startWebcam(opts?: WebcamOptions): Promise<WebcamSession> {
  assertMediaSupport();
  try {
    const stream = await navigator.mediaDevices.getUserMedia(buildConstraints(opts));
    return new Session(stream);
  } catch (e) {
    throw normalizeError(e);
  }
}

/**
 * Probe the maximum resolution a camera supports by requesting a very high ideal
 * and reading back the granted settings, then releasing the stream immediately.
 */
export async function detectMaxResolution(
  deviceId?: string,
): Promise<{ width: number; height: number }> {
  assertMediaSupport();
  const video: MediaTrackConstraints = {
    width: { ideal: 3840 },
    height: { ideal: 2160 },
  };
  if (deviceId) video.deviceId = { exact: deviceId };
  let stream: MediaStream | null = null;
  try {
    stream = await navigator.mediaDevices.getUserMedia({ video, audio: false });
    const s = stream.getVideoTracks()[0]?.getSettings() ?? {};
    return { width: s.width ?? 0, height: s.height ?? 0 };
  } catch (e) {
    throw normalizeError(e);
  } finally {
    stream?.getTracks().forEach((t) => t.stop());
  }
}
