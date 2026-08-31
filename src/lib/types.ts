// Shared types for the client-side media engine.

export type MediaKind = 'videoinput' | 'audioinput' | 'audiooutput';

export interface DeviceInfo {
  deviceId: string;
  label: string;
  kind: MediaKind;
}

export interface StreamSettings {
  width: number;
  height: number;
  frameRate: number; // reported by the track (may differ from measured)
  aspectRatio: number;
  megapixels: number;
  facingMode?: string;
  deviceLabel: string;
}

export type MediaErrorKind =
  | 'insecure-context'
  | 'unsupported'
  | 'not-allowed'
  | 'not-found'
  | 'not-readable'
  | 'overconstrained'
  | 'unknown';

export interface MediaError {
  kind: MediaErrorKind;
  message: string;
  cause?: unknown;
}

export type HealthStatus = 'pass' | 'warn' | 'fail';

export interface HealthCheck {
  id: string;
  status: HealthStatus;
  label: string;
  hint?: string;
}

export type PermissionState = 'granted' | 'denied' | 'prompt' | 'unknown';

export interface DiagnosticsInput {
  settings: StreamSettings | null;
  permission: PermissionState;
  deviceCount: number;
  measuredFps: number | null;
  luminance?: number | null; // 0..1 average brightness, optional
  secure: boolean;
}
