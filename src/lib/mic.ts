import { assertMediaSupport } from './devices';
import { normalizeError } from './webcam';

export interface MicSession {
  readonly stream: MediaStream;
  /** Start a level meter; onLevel receives a normalized 0..1 RMS value. Returns stop(). */
  meter(onLevel: (level01: number) => void): () => void;
  getLabel(): string;
  stop(): void;
}

class Mic implements MicSession {
  private ctx: AudioContext | null = null;

  constructor(readonly stream: MediaStream) {}

  getLabel(): string {
    return this.stream.getAudioTracks()[0]?.label ?? '';
  }

  meter(onLevel: (level01: number) => void): () => void {
    const AC = window.AudioContext || (window as any).webkitAudioContext;
    this.ctx = new AC();
    // AudioContext may start suspended until a user gesture; resume defensively.
    void this.ctx.resume();

    const source = this.ctx.createMediaStreamSource(this.stream);
    const analyser = this.ctx.createAnalyser();
    analyser.fftSize = 1024;
    analyser.smoothingTimeConstant = 0.8;
    source.connect(analyser);

    const buf = new Uint8Array(analyser.fftSize);
    let raf = 0;
    let active = true;

    const tick = () => {
      if (!active) return;
      analyser.getByteTimeDomainData(buf);
      let sum = 0;
      for (let i = 0; i < buf.length; i++) {
        const v = (buf[i] - 128) / 128; // -1..1
        sum += v * v;
      }
      const rms = Math.sqrt(sum / buf.length); // 0..1
      // Perceptual boost so quiet speech is visible.
      onLevel(Math.min(1, rms * 2.2));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      active = false;
      if (raf) cancelAnimationFrame(raf);
      try {
        source.disconnect();
        analyser.disconnect();
      } catch {
        /* noop */
      }
    };
  }

  stop(): void {
    this.stream.getTracks().forEach((t) => t.stop());
    if (this.ctx && this.ctx.state !== 'closed') {
      void this.ctx.close();
    }
    this.ctx = null;
  }
}

/** Start an audio-only stream. Throws a normalized MediaError on failure. */
export async function startMic(deviceId?: string): Promise<MicSession> {
  assertMediaSupport();
  const audio: MediaTrackConstraints = deviceId
    ? { deviceId: { exact: deviceId } }
    : {};
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: Object.keys(audio).length ? audio : true,
      video: false,
    });
    return new Mic(stream);
  } catch (e) {
    throw normalizeError(e);
  }
}
