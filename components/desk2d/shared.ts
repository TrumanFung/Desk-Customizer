// Oblique projection: front-facing rectangles plus one shared depth vector
// (DEPTH.dx, DEPTH.dy) for the receding top and right-hand faces. Left-pedestal
// layouts are produced by mirroring the whole drawing, not by separate art.
export const VIEW = { width: 518, height: 300 } as const;

// Cropped to the desk's bounds, centered on VIEW.width / 2 so mirrored layouts stay centered.
export const VIEWBOX = "44 34 430 248";

export const DEPTH = { dx: 78, dy: -50 } as const;

export const DESK = {
  left: 70,
  right: 370,
  topY: 110,
  topThickness: 14,
  floorY: 262,
  panelInset: 6,
  panelThickness: 12,
  pedestalWidth: 92
} as const;

// 5 drawing px ≈ 1 inch (a 60" desk is 300px wide).
export const PX_PER_INCH = 5;
