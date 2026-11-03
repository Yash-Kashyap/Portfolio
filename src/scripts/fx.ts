const cache: Record<string, Promise<HTMLImageElement>> = {};

export function load(src: string): Promise<HTMLImageElement> {
  return (
    cache[src] ||
    (cache[src] = new Promise((res, rej) => {
      const i = new Image();
      i.onload = () => res(i);
      i.onerror = rej;
      i.src = src;
    }))
  );
}

export function sample(
  img: HTMLImageElement,
  w: number,
  h: number,
  pos: [number, number],
  flip?: boolean
): ImageData {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const x = c.getContext('2d', { willReadFrequently: true })!;
  const s = Math.max(w / img.width, h / img.height);
  const dw = img.width * s;
  const dh = img.height * s;
  if (flip) {
    x.translate(w, 0);
    x.scale(-1, 1);
  }
  x.drawImage(img, (w - dw) * pos[0], (h - dh) * pos[1], dw, dh);
  return x.getImageData(0, 0, w, h);
}

const B = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

export interface DitherOptions {
  px?: number;
  pos?: [number, number];
  ink?: string;
  paper?: string;
  con?: number;
  bri?: number;
  gamma?: number;
  flip?: boolean;
}

export async function dither(cv: HTMLCanvasElement, src: string, o?: DitherOptions) {
  const opt = Object.assign(
    { px: 3, pos: [0.5, 0] as [number, number], ink: '#0F0E0C', paper: '#F7F3EA', con: 1.5, bri: 1.15, gamma: 0.55 },
    o || {}
  );
  const img = await load(src);
  const r = { width: cv.clientWidth, height: cv.clientHeight };
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const W = Math.max(1, Math.round(r.width / opt.px));
  const H = Math.max(1, Math.round(r.height / opt.px));
  const d = sample(img, W, H, opt.pos, opt.flip).data;
  cv.width = Math.round(r.width * dpr);
  cv.height = Math.round(r.height * dpr);
  const x = cv.getContext('2d')!;
  x.clearRect(0, 0, cv.width, cv.height);
  const cw = cv.width / W;
  const ch = cv.height / H;
  const lum = new Float32Array(W * H);
  for (let i = 0; i < W * H; i++) {
    let l = (d[i * 4] * 0.299 + d[i * 4 + 1] * 0.587 + d[i * 4 + 2] * 0.114) / 255;
    l = Math.pow(l, opt.gamma);
    l = (l - 0.5) * opt.con + 0.5;
    lum[i] = Math.min(1, Math.max(0, l * opt.bri));
  }
  x.fillStyle = opt.ink;
  for (let y = 0; y < H; y++) {
    for (let X = 0; X < W; X++) {
      const i = y * W + X;
      if (d[i * 4 + 3] < 128) continue;
      const t = (B[(y & 3) * 4 + (X & 3)] + 0.5) / 16;
      x.fillStyle = lum[i] > t ? opt.paper : opt.ink;
      x.fillRect(Math.floor(X * cw), Math.floor(y * ch), Math.ceil(cw), Math.ceil(ch));
    }
  }
}

export const RAMP = " .'`,:;-~_=+!|irlt1jfJcvxnuYXZ0QOB%$&#@";

export interface AsciiPrepOptions {
  cell?: number;
  pos?: [number, number];
  con?: number;
  bri?: number;
}

export interface AsciiPrepResult {
  cv: HTMLCanvasElement;
  C: number;
  R: number;
  g: Float32Array;
  cw: number;
  ch: number;
  fs: number;
  dpr: number;
}

export async function asciiPrep(
  cv: HTMLCanvasElement,
  src: string,
  o?: AsciiPrepOptions
): Promise<AsciiPrepResult> {
  const opt = Object.assign({ cell: 9, pos: [0.5, 0.1] as [number, number], con: 1.4, bri: 1.1 }, o || {});
  const img = await load(src);
  const r = { width: cv.clientWidth, height: cv.clientHeight };
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const cw = opt.cell * 0.62;
  const ch = opt.cell * 1.05;
  const C = Math.max(1, Math.floor(r.width / cw));
  const R = Math.max(1, Math.floor(r.height / ch));
  const full = sample(img, Math.round(r.width), Math.round(r.height), opt.pos);
  const fc = document.createElement('canvas');
  fc.width = full.width;
  fc.height = full.height;
  fc.getContext('2d')!.putImageData(full, 0, 0);

  const sc = document.createElement('canvas');
  sc.width = C;
  sc.height = R;
  const sx = sc.getContext('2d', { willReadFrequently: true })!;
  sx.drawImage(fc, 0, 0, C * cw, R * ch, 0, 0, C, R);

  const d = sx.getImageData(0, 0, C, R).data;
  const g = new Float32Array(C * R);
  for (let i = 0; i < C * R; i++) {
    let l = (d[i * 4] * 0.299 + d[i * 4 + 1] * 0.587 + d[i * 4 + 2] * 0.114) / 255;
    l = (l - 0.5) * opt.con + 0.5;
    g[i] = Math.min(1, Math.max(0, l * opt.bri));
  }
  cv.width = Math.round(r.width * dpr);
  cv.height = Math.round(r.height * dpr);
  return { cv, C, R, g, cw: cw * dpr, ch: ch * dpr, fs: opt.cell * dpr, dpr };
}

export function asciiDraw(
  p: AsciiPrepResult,
  t: number,
  ink: string,
  acc: string
) {
  const x = p.cv.getContext('2d')!;
  x.clearRect(0, 0, p.cv.width, p.cv.height);
  x.font = `500 ${p.fs}px "JetBrains Mono",monospace`;
  x.textBaseline = 'top';
  for (let y = 0; y < p.R; y++) {
    for (let X = 0; X < p.C; X++) {
      const l = p.g[y * p.C + X];
      if (l < 0.08) continue;
      const reveal = Math.random() < t * 1.2;
      let ch: string;
      if (!reveal) ch = RAMP[(Math.random() * RAMP.length) | 0];
      else ch = RAMP[Math.min(RAMP.length - 1, (l * (RAMP.length - 1)) | 0)];
      if (!reveal && Math.random() > t + 0.15) continue;
      x.globalAlpha = reveal ? 0.35 + l * 0.65 : 0.35;
      x.fillStyle = !reveal && Math.random() < 0.08 ? acc : ink;
      x.fillText(ch, X * p.cw, y * p.ch);
    }
  }
  x.globalAlpha = 1;
}

if (typeof window !== 'undefined') {
  (window as any).YFX = { load, dither, asciiPrep, asciiDraw };
}

