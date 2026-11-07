export const WIDTH_MIN_CM = 80;
export const WIDTH_MAX_CM = 240;

export const DEPTH_MIN_CM = 40;
export const DEPTH_MAX_CM = 120;

export const HEIGHT_MIN_CM = 60;
export const HEIGHT_MAX_CM = 130;

export const HEX_COLOR_RE = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/;

export function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}
