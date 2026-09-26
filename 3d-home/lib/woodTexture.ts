// lib/woodTexture.ts
// Procedurally generates a realistic wood-grain texture on an HTML canvas
// This avoids needing external texture files

export function createWoodTexture(
  width = 512,
  height = 512,
  options: {
    baseColor?: [number, number, number];
    grainColor?: [number, number, number];
    grainCount?: number;
    roughness?: number;
  } = {}
): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  const {
    baseColor = [185, 120, 65],
    grainColor = [140, 80, 30],
    grainCount = 18,
    roughness = 0.35,
  } = options;

  // Base fill — warm brown
  const [br, bg, bb] = baseColor;
  const baseGrad = ctx.createLinearGradient(0, 0, width, 0);
  baseGrad.addColorStop(0, `rgb(${br + 15},${bg + 10},${bb + 5})`);
  baseGrad.addColorStop(0.35, `rgb(${br},${bg},${bb})`);
  baseGrad.addColorStop(0.65, `rgb(${br - 12},${bg - 10},${bb - 6})`);
  baseGrad.addColorStop(1, `rgb(${br + 8},${bg + 5},${bb + 2})`);
  ctx.fillStyle = baseGrad;
  ctx.fillRect(0, 0, width, height);

  // Draw wood grain lines
  const [gr, gg, gb] = grainColor;
  for (let i = 0; i < grainCount; i++) {
    const x = (i / grainCount) * width + (Math.random() - 0.5) * 10;
    const lineWidth = 1 + Math.random() * 3.5;
    const alpha = 0.12 + Math.random() * 0.22;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    let cy = 0;
    while (cy < height) {
      const dx = (Math.random() - 0.5) * 5 * roughness;
      cy += 28 + Math.random() * 22;
      ctx.lineTo(x + dx, cy);
    }
    ctx.strokeStyle = `rgba(${gr},${gg},${gb},${alpha})`;
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  }

  // Fine hairline grain
  for (let i = 0; i < grainCount * 3; i++) {
    const x = Math.random() * width;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    let cy = 0;
    while (cy < height) {
      cy += 40 + Math.random() * 40;
      ctx.lineTo(x + (Math.random() - 0.5) * 2, cy);
    }
    ctx.strokeStyle = `rgba(${gr - 15},${gg - 10},${gb - 5},${0.05 + Math.random() * 0.08})`;
    ctx.lineWidth = 0.5;
    ctx.stroke();
  }

  // Top sheen
  const sheenGrad = ctx.createLinearGradient(0, 0, 0, height);
  sheenGrad.addColorStop(0, 'rgba(255,245,220,0.14)');
  sheenGrad.addColorStop(0.25, 'rgba(255,245,220,0.06)');
  sheenGrad.addColorStop(1, 'rgba(0,0,0,0.10)');
  ctx.fillStyle = sheenGrad;
  ctx.fillRect(0, 0, width, height);

  return canvas;
}

export function createConcreteTexture(width = 256, height = 256): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#c4bfb8';
  ctx.fillRect(0, 0, width, height);
  for (let y = 0; y < height; y += 2) {
    for (let x = 0; x < width; x += 2) {
      const n = (Math.random() - 0.5) * 22;
      const v = Math.max(0, Math.min(255, 196 + n));
      ctx.fillStyle = `rgba(${v},${v - 3},${v - 7},0.28)`;
      ctx.fillRect(x, y, 2, 2);
    }
  }
  return canvas;
}
