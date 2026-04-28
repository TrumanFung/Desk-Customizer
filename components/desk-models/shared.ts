import type { ReturnSide } from "@/lib/types";

export type DeskModelProps = {
  widthM: number;
  depthM: number;
  heightM: number;
  color: string;
  drawersLeft: boolean;
  drawersRight: boolean;
  returnSide: ReturnSide;
};

export const LEG_METAL = "#3d3d42";
export const DRAWER_FRONT = "#2c3340";
export const PEDESTAL = "#2a3038";
