// Live camera hardware controls.
//
// Most webcam-test sites only measure. Where the browser and the camera expose
// MediaStreamTrack capabilities, we can also *change* zoom, brightness, exposure
// and focus in place — so a bad picture can be fixed here rather than diagnosed
// and left alone. Support is uneven (Chromium is best, and many UVC cameras
// expose nothing at all), so every call degrades quietly.

export type ControlName =
  | 'zoom'
  | 'brightness'
  | 'contrast'
  | 'saturation'
  | 'sharpness'
  | 'exposureTime'
  | 'focusDistance'
  | 'colorTemperature';

export interface ControlSpec {
  name: ControlName;
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  /** Percentage-style controls read better without units. */
  unit?: string;
}

const LABELS: Record<ControlName, { label: string; unit?: string }> = {
  zoom: { label: 'Zoom', unit: '×' },
  brightness: { label: 'Brightness' },
  contrast: { label: 'Contrast' },
  saturation: { label: 'Saturation' },
  sharpness: { label: 'Sharpness' },
  exposureTime: { label: 'Exposure' },
  focusDistance: { label: 'Focus' },
  colorTemperature: { label: 'White balance', unit: 'K' },
};

const ORDER: ControlName[] = [
  'zoom',
  'brightness',
  'contrast',
  'saturation',
  'sharpness',
  'colorTemperature',
  'exposureTime',
  'focusDistance',
];

/** Adjustable controls this track actually supports, in a sensible UI order. */
export function readControls(track: MediaStreamTrack): ControlSpec[] {
  const caps = (track.getCapabilities?.() ?? {}) as Record<string, any>;
  const settings = (track.getSettings?.() ?? {}) as Record<string, any>;
  const out: ControlSpec[] = [];

  for (const name of ORDER) {
    const cap = caps[name];
    // A usable range needs distinct numeric bounds.
    if (!cap || typeof cap.min !== 'number' || typeof cap.max !== 'number') continue;
    if (cap.max <= cap.min) continue;

    const step = typeof cap.step === 'number' && cap.step > 0 ? cap.step : (cap.max - cap.min) / 100;
    const value = typeof settings[name] === 'number' ? settings[name] : (cap.min + cap.max) / 2;
    out.push({ name, ...LABELS[name], min: cap.min, max: cap.max, step, value });
  }
  return out;
}

/** Apply one control. Resolves false when the camera rejects the value. */
export async function applyControl(
  track: MediaStreamTrack,
  name: ControlName,
  value: number,
): Promise<boolean> {
  try {
    await track.applyConstraints({ advanced: [{ [name]: value }] } as MediaTrackConstraints);
    return true;
  } catch {
    return false;
  }
}

/** Restore whatever the camera considers automatic/default. */
export async function resetControls(track: MediaStreamTrack): Promise<void> {
  try {
    await track.applyConstraints({
      advanced: [{ exposureMode: 'continuous', focusMode: 'continuous', whiteBalanceMode: 'continuous' }],
    } as unknown as MediaTrackConstraints);
  } catch {
    /* not supported — nothing to restore */
  }
}

export function hasTorch(track: MediaStreamTrack): boolean {
  const caps = (track.getCapabilities?.() ?? {}) as Record<string, any>;
  return caps.torch === true || (Array.isArray(caps.torch) && caps.torch.includes(true));
}

export async function setTorch(track: MediaStreamTrack, on: boolean): Promise<boolean> {
  try {
    await track.applyConstraints({ advanced: [{ torch: on }] } as unknown as MediaTrackConstraints);
    return true;
  } catch {
    return false;
  }
}
