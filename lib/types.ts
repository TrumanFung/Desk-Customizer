export type DeskKind = "writing" | "executive" | "l-shaped";

export type ReturnSide = "left" | "right";

export type DeskDesign = {
  id: string;
  name?: string;
  width: number; // cm
  depth: number; // cm
  height: number; // cm
  color: string; // hex string
  deskKind: DeskKind;
  returnSide: ReturnSide;
  drawersLeft: boolean;
  drawersRight: boolean;
  updatedAt: string; // ISO
};

export type DeskDesignInput = Omit<DeskDesign, "id" | "updatedAt"> & {
  id?: string;
};

