// Finish names, laminate makers and codes come from uniteddesk.com/finishes.html.
// Hex values are sampled from that page's 2022 palette image, so on-screen
// color is an approximation — the site itself warns to refer to real samples.

export type FinishTier = "standard" | "designer";
export type FinishTexture = "wood" | "linear" | "speckle" | "solid";

export type Finish = {
  id: string;
  name: string;
  maker: string;
  code: string;
  hex: string;
  tier: FinishTier;
  texture: FinishTexture;
};

export const DESIGNER_UPCHARGE_PERCENT = 5;

export const FINISHES: Finish[] = [
  { id: "african-walnut", name: "African Walnut", maker: "Wilsonart", code: "7122T-60", hex: "#341e17", tier: "standard", texture: "wood" },
  { id: "black", name: "Black", maker: "Wilsonart", code: "1595-60", hex: "#11120f", tier: "standard", texture: "solid" },
  { id: "charcoal", name: "Charcoal", maker: "Nevamar", code: "S6054T", hex: "#585747", tier: "standard", texture: "solid" },
  { id: "chocolate", name: "Chocolate", maker: "Pionite/Panolam", code: "HP340", hex: "#392b1d", tier: "standard", texture: "wood" },
  { id: "cognac", name: "Cognac", maker: "Pionite", code: "HP336", hex: "#844326", tier: "standard", texture: "wood" },
  { id: "grey", name: "Grey", maker: "Formica", code: "SG213", hex: "#a39f8a", tier: "standard", texture: "solid" },
  { id: "maple", name: "Maple", maker: "Pionite", code: "WM791", hex: "#d5b078", tier: "standard", texture: "wood" },
  { id: "medium-oak", name: "Medium Oak", maker: "Pionite", code: "W0291-S", hex: "#a5703d", tier: "standard", texture: "wood" },
  { id: "oiled-cherry", name: "Oiled Cherry", maker: "Pionite", code: "WC421-S", hex: "#a65a2e", tier: "standard", texture: "wood" },
  { id: "seattle-cherry", name: "Seattle Cherry", maker: "Nevamar", code: "WC5581N", hex: "#8c4428", tier: "standard", texture: "wood" },

  { id: "midnight-grey", name: "Midnight Grey", maker: "Wilsonart", code: "7949K-18", hex: "#555141", tier: "designer", texture: "linear" },
  { id: "absolute-acajou", name: "Absolute Acajou", maker: "Pionite", code: "WY160", hex: "#655c54", tier: "designer", texture: "linear" },
  { id: "espresso", name: "Espresso", maker: "Pionite", code: "WX-421", hex: "#2e261b", tier: "designer", texture: "linear" },
  { id: "graphite-nebula", name: "Graphite Nebula", maker: "Wilsonart", code: "4623-60", hex: "#322f25", tier: "designer", texture: "speckle" },
  { id: "grey-nebula", name: "Grey Nebula", maker: "Wilsonart", code: "4622-60", hex: "#b6b2ac", tier: "designer", texture: "speckle" },
  { id: "hazelnut", name: "Hazelnut", maker: "Formica", code: "5886-43", hex: "#6d4b2e", tier: "designer", texture: "wood" },
  { id: "honey-oak", name: "Honey Oak", maker: "Formica", code: "7738-58", hex: "#aa7641", tier: "designer", texture: "wood" },
  { id: "concrete-groovze", name: "Concrete Groovze", maker: "Formica", code: "WF393-NG", hex: "#bfaf9e", tier: "designer", texture: "linear" },
  { id: "maplewood", name: "Maplewood", maker: "Formica", code: "7288-58", hex: "#bd7537", tier: "designer", texture: "wood" },
  { id: "white", name: "White", maker: "Formica", code: "933-58", hex: "#faf3e2", tier: "designer", texture: "solid" }
];

export type HardwareKind = "bar" | "crystal" | "cascade" | "spring" | "sleek" | "bow" | "knob";
export type HardwareTone = "chrome" | "silver" | "black";

export type Hardware = {
  id: string;
  name: string;
  kind: HardwareKind;
  tone: HardwareTone;
  /** Only meaningful for straight bar pulls. */
  lengthIn?: number;
};

// From uniteddesk.com/hardware.html (the site's "30' Chrome" is a typo for 30").
export const HARDWARE: Hardware[] = [
  { id: "2in-chrome", name: '2" Chrome', kind: "bar", tone: "chrome", lengthIn: 2 },
  { id: "6in-chrome", name: '6" Chrome', kind: "bar", tone: "chrome", lengthIn: 6 },
  { id: "14in-chrome", name: '14" Chrome', kind: "bar", tone: "chrome", lengthIn: 14 },
  { id: "30in-chrome", name: '30" Chrome', kind: "bar", tone: "chrome", lengthIn: 30 },
  { id: "crystal-black", name: "Crystal Black", kind: "crystal", tone: "black" },
  { id: "crystal-silver", name: "Crystal Silver", kind: "crystal", tone: "silver" },
  { id: "cascade-black", name: "Cascade Black", kind: "cascade", tone: "black" },
  { id: "cascade-silver", name: "Cascade Silver", kind: "cascade", tone: "silver" },
  { id: "spring-black", name: "Spring Black", kind: "spring", tone: "black" },
  { id: "spring-silver", name: "Spring Silver", kind: "spring", tone: "silver" },
  { id: "sleek-silver", name: "Sleek Silver", kind: "sleek", tone: "silver" },
  { id: "bow-silver", name: "Bow Silver", kind: "bow", tone: "silver" },
  { id: "knob-black", name: "Knob Black", kind: "knob", tone: "black" },
  { id: "knob-silver", name: "Knob Silver", kind: "knob", tone: "silver" }
];

export type PedestalSide = "left" | "right";

export type DeskConfig = {
  topId: string;
  baseId: string;
  hardwareId: string;
  pedestalSide: PedestalSide;
};

export const DEFAULT_CONFIG: DeskConfig = {
  topId: "seattle-cherry",
  baseId: "seattle-cherry",
  hardwareId: "sleek-silver",
  pedestalSide: "right"
};

// Starter pairings to demonstrate two-tone combinations; curated for this demo.
export const FEATURED_COMBOS: { id: string; label: string; config: DeskConfig }[] = [
  {
    id: "classic-cherry",
    label: "Classic Cherry",
    config: { topId: "seattle-cherry", baseId: "seattle-cherry", hardwareId: "sleek-silver", pedestalSide: "right" }
  },
  {
    id: "walnut-grey",
    label: "Walnut & Grey",
    config: { topId: "african-walnut", baseId: "grey", hardwareId: "crystal-black", pedestalSide: "right" }
  },
  {
    id: "maple-charcoal",
    label: "Maple & Charcoal",
    config: { topId: "maple", baseId: "charcoal", hardwareId: "6in-chrome", pedestalSide: "right" }
  },
  {
    id: "modern-white",
    label: "Modern White",
    config: { topId: "white", baseId: "graphite-nebula", hardwareId: "knob-black", pedestalSide: "left" }
  }
];
