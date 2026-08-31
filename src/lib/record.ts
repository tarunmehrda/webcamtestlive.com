// Short local recording, so you can watch yourself back instead of guessing how
// you look to other people. The clip is held in memory as a Blob and revoked on
// stop. It is never uploaded.

export interface Recording {
  url: string;
  blob: Blob;
  mimeType: string;
  durationMs: number;
  /** Measured bitrate of the encoded clip, in kbps. */
  kbps: number;
}

const CANDIDATES = [
  'video/webm;codecs=vp9,opus',
  'video/webm;codecs=vp8,opus',
  'video/webm',
  'video/mp4',
];

/** The first container this browser can actually encode, or null if none. */
export function supportedMimeType(): string | null {
  if (typeof MediaRecorder === 'undefined') return null;
  return CANDIDATES.find((t) => MediaRecorder.isTypeSupported(t)) ?? null;
}

export function canRecord(): boolean {
  return supportedMimeType() !== null;
}

export interface RecorderHandle {
  stop: () => void;
  cancel: () => void;
}

/**
 * Record `stream` for up to `maxMs`, then hand back the finished clip.
 *
 * `onProgress` fires roughly every 100ms with elapsed milliseconds so the caller
 * can drive a countdown. Returns a handle for stopping early.
 */
export function record(
  stream: MediaStream,
  {
    maxMs = 6000,
    onProgress,
    onDone,
    onError,
  }: {
    maxMs?: number;
    onProgress?: (elapsedMs: number) => void;
    onDone?: (rec: Recording) => void;
    onError?: (e: unknown) => void;
  } = {},
): RecorderHandle | null {
  const mimeType = supportedMimeType();
  if (!mimeType) {
    onError?.(new Error('Recording is not supported in this browser.'));
    return null;
  }

  let recorder: MediaRecorder;
  try {
    recorder = new MediaRecorder(stream, { mimeType });
  } catch (e) {
    onError?.(e);
    return null;
  }

  const chunks: Blob[] = [];
  const started = performance.now();
  let cancelled = false;
  let timer: number | undefined;
  let ticker: number | undefined;

  const cleanup = () => {
    window.clearTimeout(timer);
    window.clearInterval(ticker);
  };

  recorder.ondataavailable = (e) => {
    if (e.data && e.data.size) chunks.push(e.data);
  };

  recorder.onerror = (e) => {
    cleanup();
    onError?.(e);
  };

  recorder.onstop = () => {
    cleanup();
    if (cancelled) return;
    const durationMs = performance.now() - started;
    const blob = new Blob(chunks, { type: mimeType });
    onDone?.({
      url: URL.createObjectURL(blob),
      blob,
      mimeType,
      durationMs,
      kbps: durationMs > 0 ? Math.round((blob.size * 8) / durationMs) : 0,
    });
  };

  recorder.start(100);
  ticker = window.setInterval(() => onProgress?.(performance.now() - started), 100);
  timer = window.setTimeout(() => {
    if (recorder.state !== 'inactive') recorder.stop();
  }, maxMs);

  return {
    stop: () => {
      if (recorder.state !== 'inactive') recorder.stop();
    },
    cancel: () => {
      cancelled = true;
      cleanup();
      if (recorder.state !== 'inactive') recorder.stop();
    },
  };
}

/**
 * Measure the encoded bitrate of a live stream without keeping the result.
 *
 * Competitors quote a bitrate figure; this derives one honestly by encoding a
 * short sample and dividing bytes by time. Resolves to null when recording is
 * unsupported or the probe fails, so callers should treat it as optional.
 */
export function probeBitrate(stream: MediaStream, ms = 1200): Promise<number | null> {
  return new Promise((resolve) => {
    const mimeType = supportedMimeType();
    if (!mimeType) return resolve(null);

    let recorder: MediaRecorder;
    try {
      recorder = new MediaRecorder(stream, { mimeType });
    } catch {
      return resolve(null);
    }

    let bytes = 0;
    const started = performance.now();

    recorder.ondataavailable = (e) => {
      bytes += e.data?.size ?? 0;
    };
    recorder.onerror = () => resolve(null);
    recorder.onstop = () => {
      const elapsed = performance.now() - started;
      resolve(elapsed > 0 && bytes > 0 ? Math.round((bytes * 8) / elapsed) : null);
    };

    try {
      recorder.start(100);
      window.setTimeout(() => {
        if (recorder.state !== 'inactive') recorder.stop();
      }, ms);
    } catch {
      resolve(null);
    }
  });
}
