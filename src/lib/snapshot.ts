// Snapshot capture + download. Everything stays on the device.

export function captureSnapshot(
  video: HTMLVideoElement,
  mirror: boolean,
): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = video.videoWidth || 1280;
  canvas.height = video.videoHeight || 720;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    if (mirror) {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    }
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
  }
  return canvas;
}

export function downloadCanvas(
  canvas: HTMLCanvasElement,
  filename = 'webcam-snapshot.png',
  type: 'image/png' | 'image/jpeg' = 'image/png',
): void {
  canvas.toBlob(
    (blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    },
    type,
    type === 'image/jpeg' ? 0.92 : undefined,
  );
}

/** Estimate PNG + JPEG byte sizes for the current frame (for the readout). */
export function estimateSizes(
  canvas: HTMLCanvasElement,
): Promise<{ png: number; jpeg: number }> {
  const toSize = (type: string, q?: number) =>
    new Promise<number>((resolve) => {
      canvas.toBlob((b) => resolve(b ? b.size : 0), type, q);
    });
  return Promise.all([toSize('image/png'), toSize('image/jpeg', 0.92)]).then(
    ([png, jpeg]) => ({ png, jpeg }),
  );
}
