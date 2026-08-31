// Speaker / headphone output test. Generates a tone locally with the Web Audio
// API, so nothing is downloaded and nothing is recorded.

export type ToneChannel = 'left' | 'right' | 'both';

export interface TonePlayback {
  readonly channel: ToneChannel;
  /** Stop early with a short fade, so there is no click. */
  stop(): void;
  /** Resolves when the tone has finished or been stopped. */
  finished: Promise<void>;
}

export interface ToneOptions {
  frequency?: number;
  durationMs?: number;
  volume?: number;
}

let ctx: AudioContext | null = null;
let current: TonePlayback | null = null;
let sinkId: string | null = null;

export function isToneSupported(): boolean {
  return typeof window !== 'undefined' && !!(window.AudioContext ?? (window as any).webkitAudioContext);
}

function context(): AudioContext {
  const Ctor = window.AudioContext ?? (window as any).webkitAudioContext;
  ctx ??= new Ctor();
  return ctx;
}

/**
 * Can this browser route Web Audio to a chosen output device?
 *
 * Chromium can; Firefox and Safari always play through the system default. The
 * picker is hidden rather than shown broken where it is unsupported.
 */
export function canSelectOutput(): boolean {
  return typeof AudioContext !== 'undefined' && 'setSinkId' in AudioContext.prototype;
}

/** Route future tones to `deviceId` (empty string = system default). */
export async function setToneOutput(deviceId: string): Promise<void> {
  sinkId = deviceId || null;
  await applySink();
}

async function applySink(): Promise<void> {
  if (!ctx || !canSelectOutput()) return;
  try {
    await (ctx as any).setSinkId(sinkId ?? '');
  } catch {
    // The device may have been unplugged between listing and playing; the tone
    // still comes out of the default output, which is better than silence.
  }
}

/**
 * Play a sine tone through one or both channels.
 *
 * Async because the context has to be *running* before anything is scheduled:
 * browsers hand back a suspended context until a user gesture, its clock does not
 * advance while suspended, and a tone scheduled against that frozen clock either
 * never sounds or fires late as a click. Awaiting `resume()` inside the click
 * handler is what makes this reliable on iOS in particular.
 *
 * The gain is ramped in and out rather than switched, because an abrupt start or
 * stop produces an audible pop that people mistake for a blown speaker.
 */
export async function playTone(
  channel: ToneChannel = 'both',
  { frequency = 440, durationMs = 1500, volume = 0.16 }: ToneOptions = {},
): Promise<TonePlayback> {
  // One tone at a time: a second press replaces the first instead of stacking
  // oscillators, which would sum into distortion and misreport the channel.
  stopTone();

  const ac = context();
  await applySink();
  if (ac.state !== 'running') {
    try {
      await ac.resume();
    } catch {
      /* Resume can reject outside a gesture; scheduling below still tries. */
    }
  }

  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.type = 'sine';
  osc.frequency.value = frequency;

  const now = ac.currentTime;
  const fade = 0.02;
  const end = now + durationMs / 1000;

  gain.gain.setValueAtTime(0, now);
  gain.gain.linearRampToValueAtTime(volume, now + fade);
  gain.gain.setValueAtTime(volume, Math.max(now + fade, end - fade));
  gain.gain.linearRampToValueAtTime(0, end);

  const tail: AudioNode[] = [gain];
  const panner = ac.createStereoPanner?.();
  if (panner) {
    panner.pan.value = channel === 'left' ? -1 : channel === 'right' ? 1 : 0;
    gain.connect(panner).connect(ac.destination);
    tail.push(panner);
  } else if (channel !== 'both') {
    // Safari < 14.1 has no StereoPannerNode. A merger still gives real channel
    // separation, which is the entire point of the left/right buttons.
    const merger = ac.createChannelMerger(2);
    const silent = ac.createGain();
    silent.gain.value = 0;
    gain.connect(merger, 0, channel === 'left' ? 0 : 1);
    silent.connect(merger, 0, channel === 'left' ? 1 : 0);
    merger.connect(ac.destination);
    tail.push(merger, silent);
  } else {
    gain.connect(ac.destination);
  }
  osc.connect(gain);

  osc.start(now);
  osc.stop(end);

  let settle!: () => void;
  const finished = new Promise<void>((resolve) => {
    settle = resolve;
  });

  let done = false;
  const teardown = () => {
    if (done) return;
    done = true;
    window.clearTimeout(timer);
    try {
      osc.disconnect();
      for (const node of tail) node.disconnect();
    } catch {
      /* already torn down */
    }
    if (current === playback) current = null;
    settle();
  };

  osc.onended = teardown;
  // `onended` does not fire in every engine (and never fires if the tab is
  // backgrounded mid-tone), so the UI is never left stuck on "Playing".
  const timer = window.setTimeout(teardown, durationMs + 250);

  const playback: TonePlayback = {
    channel,
    finished,
    stop() {
      if (done) return;
      const t = ac.currentTime;
      try {
        gain.gain.cancelScheduledValues(t);
        gain.gain.setValueAtTime(gain.gain.value, t);
        gain.gain.linearRampToValueAtTime(0, t + fade);
        osc.stop(t + fade);
      } catch {
        teardown();
      }
    },
  };

  current = playback;
  return playback;
}

/** Stop whatever is playing right now. Safe to call when nothing is. */
export function stopTone(): void {
  current?.stop();
  current = null;
}

/** Release the shared AudioContext. Safe to call when one was never created. */
export function closeTone(): void {
  stopTone();
  const closing = ctx;
  ctx = null;
  void closing?.close().catch(() => {});
}
