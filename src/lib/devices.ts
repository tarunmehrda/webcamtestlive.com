import type { DeviceInfo, MediaKind, MediaError, PermissionState } from './types';

/** True when getUserMedia is usable (secure context + API present). */
export function isSecureMediaContext(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.isSecureContext &&
    !!navigator.mediaDevices &&
    typeof navigator.mediaDevices.getUserMedia === 'function'
  );
}

/** Throws a normalized MediaError if media capture is unavailable. */
export function assertMediaSupport(): void {
  if (typeof navigator === 'undefined' || !navigator.mediaDevices) {
    const err: MediaError = {
      kind: 'unsupported',
      message: 'Your browser does not support camera access (navigator.mediaDevices missing).',
    };
    throw err;
  }
  if (!window.isSecureContext) {
    const err: MediaError = {
      kind: 'insecure-context',
      message: 'Camera access requires a secure connection. Open this page over HTTPS or on localhost.',
    };
    throw err;
  }
}

/** Enumerate input devices. Labels are blank until permission has been granted once. */
export async function listDevices(kind?: MediaKind): Promise<DeviceInfo[]> {
  if (!navigator.mediaDevices?.enumerateDevices) return [];
  const devices = await navigator.mediaDevices.enumerateDevices();
  let cam = 0;
  let mic = 0;
  return devices
    .filter((d) => d.kind === 'videoinput' || d.kind === 'audioinput')
    .filter((d) => (kind ? d.kind === kind : true))
    .map((d) => {
      const isCam = d.kind === 'videoinput';
      const fallback = isCam ? `Camera ${++cam}` : `Microphone ${++mic}`;
      return {
        deviceId: d.deviceId,
        label: d.label || fallback,
        kind: d.kind as MediaKind,
      };
    });
}

/** Query permission state where supported; degrade gracefully (e.g. Safari). */
export async function queryPermission(
  name: 'camera' | 'microphone',
): Promise<PermissionState> {
  try {
    // @ts-expect-error - 'camera'/'microphone' are valid but not in all TS lib versions
    const status = await navigator.permissions?.query({ name });
    if (!status) return 'unknown';
    return status.state as PermissionState;
  } catch {
    return 'unknown';
  }
}

/** Subscribe to hot-plug device changes (debounced). Returns an unsubscribe fn. */
export function onDeviceChange(cb: () => void, debounceMs = 300): () => void {
  if (!navigator.mediaDevices) return () => {};
  let timer: number | undefined;
  const handler = () => {
    window.clearTimeout(timer);
    timer = window.setTimeout(cb, debounceMs);
  };
  navigator.mediaDevices.addEventListener('devicechange', handler);
  return () => {
    window.clearTimeout(timer);
    navigator.mediaDevices.removeEventListener('devicechange', handler);
  };
}
