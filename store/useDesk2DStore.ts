"use client";

import { create } from "zustand";
import {
  DEFAULT_CONFIG,
  type DeskConfig,
  type PedestalSide
} from "@/lib/desk2d/catalog";

type Desk2DState = {
  config: DeskConfig;

  setConfig: (config: DeskConfig) => void;
  setTopFinish: (id: string) => void;
  setBaseFinish: (id: string) => void;
  matchBaseToTop: () => void;
  setHardware: (id: string) => void;
  setPedestalSide: (side: PedestalSide) => void;
};

export const useDesk2DStore = create<Desk2DState>((set) => ({
  config: DEFAULT_CONFIG,

  setConfig: (config) => set({ config }),
  setTopFinish: (id) => set((s) => ({ config: { ...s.config, topId: id } })),
  setBaseFinish: (id) => set((s) => ({ config: { ...s.config, baseId: id } })),
  matchBaseToTop: () => set((s) => ({ config: { ...s.config, baseId: s.config.topId } })),
  setHardware: (id) => set((s) => ({ config: { ...s.config, hardwareId: id } })),
  setPedestalSide: (side) => set((s) => ({ config: { ...s.config, pedestalSide: side } }))
}));
