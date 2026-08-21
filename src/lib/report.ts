// Builds a plain-text diagnostics report. Useful when someone else — an IT desk,
// a colleague — has to help you and cannot see your screen.

import type { HealthCheck, StreamSettings } from './types';
import type { ImageStats } from './imagestats';

export interface Environment {
  browser: string;
  os: string;
  secure: boolean;
  cameras: number;
  microphones: number;
}

/** Best-effort browser and OS names. UA parsing is imprecise by nature. */
export function readEnvironment(cameras: number, microphones: number): Environment {
  const ua = navigator.userAgent;
  const brands = (navigator as any).userAgentData?.brands as
    | { brand: string; version: string }[]
    | undefined;

  let browser = 'Unknown browser';
  const named = brands?.find(
    (b) => !/Not.?A.?Brand|Chromium/i.test(b.brand),
  );
  if (named) {
    browser = `${named.brand} ${named.version}`;
  } else {
    // Order matters: Edge and Opera both contain "Chrome", Chrome contains "Safari".
    const m =
      /(Edg|OPR|Firefox|Chrome|Safari)\/(\d+)/.exec(
        /Edg\//.test(ua) ? ua.replace(/Chrome\/\d+/, '') : ua,
      ) ?? null;
    if (m) {
      const name = { Edg: 'Edge', OPR: 'Opera' }[m[1] as 'Edg' | 'OPR'] ?? m[1];
      browser = `${name} ${m[2]}`;
    }
  }

  const platform = (navigator as any).userAgentData?.platform as string | undefined;
  const os =
    platform ||
    (/Windows NT 10/.test(ua)
      ? 'Windows'
      : /Mac OS X/.test(ua)
        ? 'macOS'
        : /Android/.test(ua)
          ? 'Android'
          : /iPhone|iPad/.test(ua)
            ? 'iOS'
            : /Linux/.test(ua)
              ? 'Linux'
              : 'Unknown OS');

  return {
    browser,
    os,
    secure: typeof window !== 'undefined' && window.isSecureContext,
    cameras,
    microphones,
  };
}

export interface ReportInput {
  env: Environment;
  settings: StreamSettings | null;
  measuredFps: number | null;
  maxRes: { width: number; height: number } | null;
  stats: ImageStats | null;
  kbps: number | null;
  checks: HealthCheck[];
  url: string;
}

/** Render the report as text suitable for pasting into a ticket or a chat. */
export function buildReport(i: ReportInput): string {
  const L: string[] = [];
  const row = (k: string, v: string | number | undefined | null) =>
    v === undefined || v === null || v === '' ? undefined : L.push(`  ${k.padEnd(16)}${v}`);

  L.push('Webcam Test — diagnostics report');
  L.push(`  ${'Generated'.padEnd(16)}${new Date().toISOString()}`);
  L.push(`  ${'Page'.padEnd(16)}${i.url}`);
  L.push('');

  L.push('Environment');
  row('Browser', i.env.browser);
  row('OS', i.env.os);
  row('Secure ctx', i.env.secure ? 'yes (HTTPS)' : 'NO — camera will be blocked');
  row('Cameras', i.env.cameras);
  row('Microphones', i.env.microphones);
  L.push('');

  L.push('Camera');
  if (i.settings) {
    row('Device', i.settings.deviceLabel || 'Unnamed camera');
    row('Resolution', `${i.settings.width}x${i.settings.height}`);
    row('Max supported', i.maxRes ? `${i.maxRes.width}x${i.maxRes.height}` : 'not detected');
    row('Frame rate', i.measuredFps ? `${Math.round(i.measuredFps)} fps (measured)` : `${Math.round(i.settings.frameRate)} fps (reported)`);
    row('Aspect ratio', i.settings.aspectRatio.toFixed(2));
    row('Megapixels', i.settings.megapixels.toFixed(2));
    row('Bitrate', i.kbps ? `${i.kbps} kbps` : undefined);
  } else {
    L.push('  not started');
  }
  L.push('');

  if (i.stats) {
    L.push('Image');
    row('Brightness', `${i.stats.brightness}%`);
    row('Contrast', `${i.stats.contrast}%`);
    row('Saturation', `${i.stats.saturation}%`);
    row('Colours', i.stats.colors.toLocaleString());
    L.push('');
  }

  L.push('Health checks');
  if (i.checks.length) {
    for (const c of i.checks) {
      const mark = { pass: 'PASS', warn: 'WARN', fail: 'FAIL' }[c.status];
      L.push(`  [${mark}] ${c.label}${c.hint ? ` — ${c.hint}` : ''}`);
    }
  } else {
    L.push('  none run');
  }

  return L.join('\n');
}

/** Copy text to the clipboard, falling back for browsers without the async API. */
export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(ta);
      return ok;
    } catch {
      return false;
    }
  }
}
