import * as THREE from 'three';

// Cache generated textures to avoid re-generating on every render
const textureCache = new Map<string, THREE.CanvasTexture>();

/**
 * Creates a high-detail wood parquet plank texture with warm honey-teak tones,
 * plank seams, subtle wood grain and finish variation.
 */
export function getWoodParquetTexture(repeatX = 6, repeatY = 6): THREE.CanvasTexture {
  const cacheKey = `wood_parquet_${repeatX}_${repeatY}`;
  if (typeof document === 'undefined') {
    return new THREE.CanvasTexture({} as any);
  }
  if (textureCache.has(cacheKey)) {
    return textureCache.get(cacheKey)!;
  }

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    ctx.fillStyle = '#b46d37';
    ctx.fillRect(0, 0, 512, 512);

    const rows = 16;
    const rowHeight = 512 / rows;
    const plankWidth = 512 / 4;

    const woodTones = [
      '#a8602b', '#b36b35', '#be773f', '#a15824',
      '#c47e45', '#9a511f', '#ba723b', '#aa622c'
    ];

    for (let r = 0; r < rows; r++) {
      const y = r * rowHeight;
      const offset = (r % 3) * (plankWidth * 0.33);

      for (let x = -plankWidth; x < 512 + plankWidth; x += plankWidth) {
        const toneIndex = Math.floor(Math.abs(Math.sin(r * 12.9898 + x * 78.233)) * woodTones.length);
        ctx.fillStyle = woodTones[toneIndex];
        ctx.fillRect(x + offset, y, plankWidth, rowHeight);

        // Wood grain
        ctx.strokeStyle = 'rgba(70, 35, 15, 0.18)';
        ctx.lineWidth = 1;
        for (let g = 2; g < rowHeight; g += 3 + Math.random() * 4) {
          ctx.beginPath();
          ctx.moveTo(x + offset, y + g);
          ctx.lineTo(x + offset + plankWidth, y + g);
          ctx.stroke();
        }

        // Plank bevel shadow
        ctx.strokeStyle = 'rgba(40, 20, 10, 0.45)';
        ctx.lineWidth = 1.2;
        ctx.strokeRect(x + offset, y, plankWidth, rowHeight);
      }
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(repeatX, repeatY);
  texture.needsUpdate = true;
  textureCache.set(cacheKey, texture);
  return texture;
}

/**
 * Creates speckled terrazzo tile texture for the bathroom floor.
 */
export function getTerrazzoTexture(repeatX = 4, repeatY = 4): THREE.CanvasTexture {
  const cacheKey = `terrazzo_${repeatX}_${repeatY}`;
  if (typeof document === 'undefined') {
    return new THREE.CanvasTexture({} as any);
  }
  if (textureCache.has(cacheKey)) {
    return textureCache.get(cacheKey)!;
  }

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    ctx.fillStyle = '#e8ecef';
    ctx.fillRect(0, 0, 512, 512);

    const chipColors = [
      '#1e293b', '#334155', '#475569', '#c2410c',
      '#9a3412', '#b45309', '#0f172a', '#64748b'
    ];

    for (let i = 0; i < 1200; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 512;
      const size = Math.random() * 4 + 1;
      const color = chipColors[Math.floor(Math.random() * chipColors.length)];

      ctx.fillStyle = color;
      ctx.beginPath();
      const sides = Math.floor(Math.random() * 3) + 3;
      for (let s = 0; s < sides; s++) {
        const angle = (s / sides) * Math.PI * 2;
        const rad = size * (0.6 + Math.random() * 0.8);
        const px = x + Math.cos(angle) * rad;
        const py = y + Math.sin(angle) * rad;
        if (s === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(repeatX, repeatY);
  texture.needsUpdate = true;
  textureCache.set(cacheKey, texture);
  return texture;
}

/**
 * Creates flagstone paver texture for the garden walkway.
 */
export function getFlagstonePathTexture(repeatX = 5, repeatY = 5): THREE.CanvasTexture {
  const cacheKey = `flagstone_${repeatX}_${repeatY}`;
  if (typeof document === 'undefined') {
    return new THREE.CanvasTexture({} as any);
  }
  if (textureCache.has(cacheKey)) {
    return textureCache.get(cacheKey)!;
  }

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    ctx.fillStyle = '#2d3748';
    ctx.fillRect(0, 0, 512, 512);

    const stoneColors = [
      '#85929E', '#9AA7B1', '#7B8893', '#AAB7C1',
      '#6C7984', '#93A0AA', '#8E9AA4', '#788590'
    ];

    const cols = 8;
    const rows = 8;
    const cw = 512 / cols;
    const ch = 512 / rows;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const cx = c * cw + cw / 2;
        const cy = r * ch + ch / 2;
        const rx = cw * 0.42;
        const ry = ch * 0.42;

        const color = stoneColors[(r * cols + c) % stoneColors.length];
        ctx.fillStyle = color;

        ctx.beginPath();
        const pts = 8;
        for (let p = 0; p < pts; p++) {
          const angle = (p / pts) * Math.PI * 2;
          const jitter = 0.8 + Math.sin(p * 3 + r * 5 + c * 7) * 0.25;
          const px = cx + Math.cos(angle) * rx * jitter;
          const py = cy + Math.sin(angle) * ry * jitter;
          if (p === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.fill();
      }
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(repeatX, repeatY);
  texture.needsUpdate = true;
  textureCache.set(cacheKey, texture);
  return texture;
}

/**
 * Creates subtle architectural stucco texture for the exterior walls.
 */
export function getStuccoTexture(repeatX = 8, repeatY = 8): THREE.CanvasTexture {
  const cacheKey = `stucco_${repeatX}_${repeatY}`;
  if (typeof document === 'undefined') {
    return new THREE.CanvasTexture({} as any);
  }
  if (textureCache.has(cacheKey)) {
    return textureCache.get(cacheKey)!;
  }

  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 256, 256);

    for (let i = 0; i < 2800; i++) {
      const x = Math.random() * 256;
      const y = Math.random() * 256;
      const val = Math.random() > 0.5 ? 245 : 215;
      ctx.fillStyle = `rgba(${val}, ${val}, ${val}, 0.25)`;
      ctx.fillRect(x, y, 1.5, 1.5);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(repeatX, repeatY);
  texture.needsUpdate = true;
  textureCache.set(cacheKey, texture);
  return texture;
}

/**
 * Creates Italian marble texture for the Luxury style facade.
 */
export function getMarbleTexture(repeatX = 4, repeatY = 4): THREE.CanvasTexture {
  const cacheKey = `marble_${repeatX}_${repeatY}`;
  if (typeof document === 'undefined') {
    return new THREE.CanvasTexture({} as any);
  }
  if (textureCache.has(cacheKey)) {
    return textureCache.get(cacheKey)!;
  }

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    ctx.fillStyle = '#fafaf9';
    ctx.fillRect(0, 0, 512, 512);

    // Subtle golden/grey veins
    const veinColors = ['rgba(212, 175, 55, 0.25)', 'rgba(100, 116, 139, 0.2)'];
    for (let v = 0; v < 8; v++) {
      ctx.strokeStyle = veinColors[v % veinColors.length];
      ctx.lineWidth = Math.random() * 2.5 + 1;
      ctx.beginPath();
      let cx = Math.random() * 512;
      let cy = 0;
      ctx.moveTo(cx, cy);
      while (cy < 512) {
        cx += (Math.random() - 0.5) * 35;
        cy += Math.random() * 30 + 10;
        ctx.lineTo(cx, cy);
      }
      ctx.stroke();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(repeatX, repeatY);
  texture.needsUpdate = true;
  textureCache.set(cacheKey, texture);
  return texture;
}

/**
 * Creates dark modern brick texture for the Industrial style.
 */
export function getBrickTexture(repeatX = 6, repeatY = 6): THREE.CanvasTexture {
  const cacheKey = `brick_${repeatX}_${repeatY}`;
  if (typeof document === 'undefined') {
    return new THREE.CanvasTexture({} as any);
  }
  if (textureCache.has(cacheKey)) {
    return textureCache.get(cacheKey)!;
  }

  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(0, 0, 512, 512);

    const rows = 24;
    const rh = 512 / rows;
    const bw = 512 / 6;

    for (let r = 0; r < rows; r++) {
      const y = r * rh;
      const off = (r % 2) * (bw / 2);
      for (let x = -bw; x < 512 + bw; x += bw) {
        ctx.fillStyle = (r + x) % 3 === 0 ? '#334155' : '#475569';
        ctx.fillRect(x + off + 1, y + 1, bw - 2, rh - 2);
      }
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(repeatX, repeatY);
  texture.needsUpdate = true;
  textureCache.set(cacheKey, texture);
  return texture;
}

/**
 * Creates Terracotta Spanish tile roof texture for Traditional style.
 */
export function getTerracottaRoofTexture(repeatX = 6, repeatY = 6): THREE.CanvasTexture {
  const cacheKey = `terracotta_roof_${repeatX}_${repeatY}`;
  if (typeof document === 'undefined') {
    return new THREE.CanvasTexture({} as any);
  }
  if (textureCache.has(cacheKey)) {
    return textureCache.get(cacheKey)!;
  }

  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    ctx.fillStyle = '#991b1b';
    ctx.fillRect(0, 0, 256, 256);

    const tileW = 256 / 8;
    for (let x = 0; x < 256; x += tileW) {
      const grad = ctx.createLinearGradient(x, 0, x + tileW, 0);
      grad.addColorStop(0, '#7f1d1d');
      grad.addColorStop(0.5, '#b91c1c');
      grad.addColorStop(1, '#450a0a');
      ctx.fillStyle = grad;
      ctx.fillRect(x, 0, tileW, 256);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(repeatX, repeatY);
  texture.needsUpdate = true;
  textureCache.set(cacheKey, texture);
  return texture;
}

/**
 * Creates woven fabric texture for living room area rug.
 */
export function getWovenRugTexture(repeatX = 3, repeatY = 3): THREE.CanvasTexture {
  const cacheKey = `woven_rug_${repeatX}_${repeatY}`;
  if (typeof document === 'undefined') {
    return new THREE.CanvasTexture({} as any);
  }
  if (textureCache.has(cacheKey)) {
    return textureCache.get(cacheKey)!;
  }

  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    ctx.fillStyle = '#d4c7b8';
    ctx.fillRect(0, 0, 256, 256);

    ctx.strokeStyle = 'rgba(130, 115, 100, 0.3)';
    ctx.lineWidth = 1.5;
    for (let i = 0; i < 256; i += 4) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, 256);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(256, i);
      ctx.stroke();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(repeatX, repeatY);
  texture.needsUpdate = true;
  textureCache.set(cacheKey, texture);
  return texture;
}

/**
 * Creates colorful striped runner for dining table.
 */
export function getStripedRunnerTexture(): THREE.CanvasTexture {
  const cacheKey = 'striped_runner';
  if (typeof document === 'undefined') {
    return new THREE.CanvasTexture({} as any);
  }
  if (textureCache.has(cacheKey)) {
    return textureCache.get(cacheKey)!;
  }

  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    const stripes = [
      '#e11d48', '#f59e0b', '#10b981', '#3b82f6',
      '#8b5cf6', '#ec4899', '#f97316', '#14b8a6'
    ];
    const sw = 256 / stripes.length;
    stripes.forEach((color, i) => {
      ctx.fillStyle = color;
      ctx.fillRect(i * sw, 0, sw, 64);
    });
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.needsUpdate = true;
  textureCache.set(cacheKey, texture);
  return texture;
}

/**
 * Creates lush emerald lawn grass texture.
 */
export function getGrassTexture(repeatX = 12, repeatY = 12): THREE.CanvasTexture {
  const cacheKey = `grass_${repeatX}_${repeatY}`;
  if (typeof document === 'undefined') {
    return new THREE.CanvasTexture({} as any);
  }
  if (textureCache.has(cacheKey)) {
    return textureCache.get(cacheKey)!;
  }

  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  if (ctx) {
    ctx.fillStyle = '#1e3f20';
    ctx.fillRect(0, 0, 256, 256);

    const grassShades = ['#234a26', '#1a371c', '#2b5a2e', '#152e17'];
    for (let i = 0; i < 3000; i++) {
      const x = Math.random() * 256;
      const y = Math.random() * 256;
      ctx.fillStyle = grassShades[Math.floor(Math.random() * grassShades.length)];
      ctx.fillRect(x, y, 2, 3);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(repeatX, repeatY);
  texture.needsUpdate = true;
  textureCache.set(cacheKey, texture);
  return texture;
}
