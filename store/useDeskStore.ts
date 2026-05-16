"use client";

import { create } from "zustand";
import type {
  DeskDesign,
  DeskDesignInput,
  DeskKind,
  ReturnSide
} from "@/lib/types";

type DeskState = {
  width: number;
  depth: number;
  height: number;
  color: string;
  deskKind: DeskKind;
  returnSide: ReturnSide;
  drawersLeft: boolean;
  drawersRight: boolean;

  name: string;
  selectedDesignId: string | null;

  designs: DeskDesign[];
  isBusy: boolean;
  error: string | null;

  isSidebarOpen: boolean;
  toggleSidebar: () => void;

  setWidth: (cm: number) => void;
  setDepth: (cm: number) => void;
  setHeight: (cm: number) => void;
  setColor: (hex: string) => void;
  setDeskKind: (kind: DeskKind) => void;
  setReturnSide: (side: ReturnSide) => void;
  setName: (name: string) => void;
  toggleDrawerLeft: () => void;
  toggleDrawerRight: () => void;

  hydrateFromDesign: (d: DeskDesign) => void;

  listDesigns: () => Promise<void>;
  loadDesign: (id: string) => Promise<void>;
  saveDesign: () => Promise<void>;
  deleteDesign: (id: string) => Promise<void>;
};

const clamp = (n: number, min: number, max: number) =>
  Math.min(max, Math.max(min, n));

export const useDeskStore = create<DeskState>((set, get) => ({
  width: 140,
  depth: 70,
  height: 75,
  color: "#c18f59",
  deskKind: "writing",
  returnSide: "right",
  drawersLeft: false,
  drawersRight: false,

  name: "My desk",
  selectedDesignId: null,

  designs: [],
  isBusy: false,
  error: null,

  isSidebarOpen: true,
  toggleSidebar: () => set((s) => ({ isSidebarOpen: !s.isSidebarOpen })),

  setWidth: (cm) => set({ width: clamp(cm, 80, 240) }),
  setDepth: (cm) => set({ depth: clamp(cm, 40, 120) }),
  setHeight: (cm) => set({ height: clamp(cm, 60, 130) }),
  setColor: (hex) => set({ color: hex }),
  setDeskKind: (kind) => set({ deskKind: kind }),
  setReturnSide: (side) => set({ returnSide: side }),
  setName: (name) => set({ name }),
  toggleDrawerLeft: () => set((s) => ({ drawersLeft: !s.drawersLeft })),
  toggleDrawerRight: () => set((s) => ({ drawersRight: !s.drawersRight })),

  hydrateFromDesign: (d) =>
    set({
      selectedDesignId: d.id,
      name: d.name ?? "",
      width: d.width,
      depth: d.depth,
      height: d.height,
      color: d.color,
      deskKind: d.deskKind,
      returnSide: d.returnSide,
      drawersLeft: d.drawersLeft,
      drawersRight: d.drawersRight,
      error: null
    }),

  listDesigns: async () => {
    set({ isBusy: true, error: null });
    try {
      const res = await fetch("/api/designs", { cache: "no-store" });
      if (!res.ok) throw new Error(`List failed (${res.status})`);
      const data = (await res.json()) as { designs: DeskDesign[] };
      set({ designs: data.designs });
    } catch (e) {
      set({ error: e instanceof Error ? e.message : "Unknown error" });
    } finally {
      set({ isBusy: false });
    }
  },

  loadDesign: async (id) => {
    set({ isBusy: true, error: null });
    try {
      const res = await fetch(`/api/designs/${encodeURIComponent(id)}`, {
        cache: "no-store"
      });
      if (!res.ok) throw new Error(`Load failed (${res.status})`);
      const data = (await res.json()) as { design: DeskDesign };
      get().hydrateFromDesign(data.design);
    } catch (e) {
      set({ error: e instanceof Error ? e.message : "Unknown error" });
    } finally {
      set({ isBusy: false });
    }
  },

  saveDesign: async () => {
    set({ isBusy: true, error: null });
    const s = get();
    const input: DeskDesignInput = {
      id: s.selectedDesignId ?? undefined,
      name: s.name.trim() || undefined,
      width: s.width,
      depth: s.depth,
      height: s.height,
      color: s.color,
      deskKind: s.deskKind,
      returnSide: s.returnSide,
      drawersLeft: s.drawersLeft,
      drawersRight: s.drawersRight
    };

    try {
      const isUpdate = Boolean(s.selectedDesignId);
      const url = isUpdate
        ? `/api/designs/${encodeURIComponent(s.selectedDesignId!)}`
        : "/api/designs";
      const method = isUpdate ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "content-type": "application/json" },
        body: JSON.stringify(input)
      });
      if (!res.ok) throw new Error(`Save failed (${res.status})`);
      const data = (await res.json()) as { design: DeskDesign };
      set({ selectedDesignId: data.design.id });
      await get().listDesigns();
    } catch (e) {
      set({ error: e instanceof Error ? e.message : "Unknown error" });
    } finally {
      set({ isBusy: false });
    }
  },

  deleteDesign: async (id) => {
    set({ isBusy: true, error: null });
    try {
      const res = await fetch(`/api/designs/${encodeURIComponent(id)}`, {
        method: "DELETE"
      });
      if (!res.ok) throw new Error(`Delete failed (${res.status})`);
      const current = get().selectedDesignId;
      if (current === id) set({ selectedDesignId: null });
      await get().listDesigns();
    } catch (e) {
      set({ error: e instanceof Error ? e.message : "Unknown error" });
    } finally {
      set({ isBusy: false });
    }
  }
}));

