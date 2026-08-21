// Tiny DOM + formatting helpers shared by the tool islands.

export function $<T extends HTMLElement = HTMLElement>(
  sel: string,
  root: ParentNode = document,
): T | null {
  return root.querySelector<T>(sel);
}

export function $$<T extends HTMLElement = HTMLElement>(
  sel: string,
  root: ParentNode = document,
): T[] {
  return Array.from(root.querySelectorAll<T>(sel));
}

export function setText(el: Element | null, value: string | number): void {
  if (el) el.textContent = String(value);
}

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}

/** Reduce e.g. 1920x1080 → "16:9". */
export function formatAspectRatio(w: number, h: number): string {
  if (!w || !h) return '—';
  const d = gcd(w, h);
  return `${w / d}:${h / d}`;
}

export function formatMegapixels(w: number, h: number): string {
  if (!w || !h) return '—';
  return `${((w * h) / 1_000_000).toFixed(1)} MP`;
}

export function formatFps(fps: number | null): string {
  if (fps === null || Number.isNaN(fps)) return '—';
  return `${Math.round(fps)} fps`;
}

export function formatResolution(w: number, h: number): string {
  if (!w || !h) return '—';
  return `${w} × ${h}`;
}

/** Friendly common name for a resolution, e.g. 1920x1080 → "1080p (Full HD)". */
export function commonResolutionName(w: number, h: number): string {
  const map: Record<number, string> = {
    2160: '4K UHD',
    1440: '1440p (QHD)',
    1080: '1080p (Full HD)',
    720: '720p (HD)',
    480: '480p (SD)',
    360: '360p',
    240: '240p',
  };
  return map[h] ?? `${w}×${h}`;
}

export function formatBytes(n: number): string {
  if (!n) return '—';
  const units = ['B', 'KB', 'MB'];
  let i = 0;
  let v = n;
  while (v >= 1024 && i < units.length - 1) {
    v /= 1024;
    i++;
  }
  return `${v.toFixed(v >= 10 || i === 0 ? 0 : 1)} ${units[i]}`;
}
