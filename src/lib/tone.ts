// Speaker / headphone output test. Generates a tone locally with the Web Audio
// API — nothing is downloaded and nothing is recorded.

export type ToneChannel = 'left' | 'right' | 'both';

let ctx: AudioContext | null = null;

function context(): AudioContext {
  const Ctor = window.AudioContext ?? (window as any).webkitAudioContext;
  ctx ??= new Ctor();
  return ctx;
}

/**
 * Play a short sine tone through one or both channels.
 *
 * Resolves when the tone has finished. The gain is ramped in and out rather than
 * switched, because an abrupt start or stop produces an audible click that people
 * mistake for a blown speaker.
 */
export function playTone(
  channel: ToneChannel = 'both',
  { frequency = 440, durationMs = 1200, volume = 0.15 } = {},
): Promise<void> {
  const ac = context();
  // Browsers start the context suspended until a user gesture.
  if (ac.state === 'suspended') void ac.resume();

  const osc = ac.createOscillator();
  const gain = ac.createGain();
  const panner = ac.createStereoPanner?.();

  osc.type = 'sine';
  osc.frequency.value = frequency;

  const now = ac.currentTime;
  const end = now + durationMs / 1000;
  const fade = 0.02;

  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(volume, now + fade);
  gain.gain.setValueAtTime(volume, end - fade);
  gain.gain.linearRampToValueAtTime(0, end);

  if (panner) {
    panner.pan.value = channel === 'left' ? -1 : channel === 'right' ? 1 : 0;
    osc.connect(gain).connect(panner).connect(ac.destination);
  } else {
    // Safari < 14.1 has no StereoPannerNode; fall back to centre.
    osc.connect(gain).connect(ac.destination);
  }

  osc.start(now);
  osc.stop(end);

  return new Promise((resolve) => {
    osc.onended = () => {
      try {
        osc.disconnect();
        gain.disconnect();
        panner?.disconnect();
      } catch {
        /* already torn down */
      }
      resolve();
    };
  });
}

/** Release the shared AudioContext. Safe to call when one was never created. */
export function closeTone(): void {
  void ctx?.close();
  ctx = null;
}
