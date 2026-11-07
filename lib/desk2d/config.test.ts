import { describe, expect, it } from "vitest";
import { DEFAULT_CONFIG, FEATURED_COMBOS, FINISHES, HARDWARE } from "./catalog";
import {
  buildSpecText,
  decodeConfig,
  encodeConfig,
  getFinish,
  getHardware,
  usesDesignerFinish
} from "./config";

describe("catalog", () => {
  it("has unique ids and valid hex colors", () => {
    expect(new Set(FINISHES.map((f) => f.id)).size).toBe(FINISHES.length);
    expect(new Set(HARDWARE.map((h) => h.id)).size).toBe(HARDWARE.length);
    for (const finish of FINISHES) expect(finish.hex).toMatch(/^#[0-9a-f]{6}$/);
  });

  it("only references real finishes and hardware in the default and featured combos", () => {
    for (const config of [DEFAULT_CONFIG, ...FEATURED_COMBOS.map((c) => c.config)]) {
      expect(FINISHES.some((f) => f.id === config.topId)).toBe(true);
      expect(FINISHES.some((f) => f.id === config.baseId)).toBe(true);
      expect(HARDWARE.some((h) => h.id === config.hardwareId)).toBe(true);
    }
  });
});

describe("encodeConfig / decodeConfig", () => {
  it("round-trips every featured combination", () => {
    for (const { config } of FEATURED_COMBOS) {
      const decoded = decodeConfig(new URLSearchParams(encodeConfig(config)));
      expect(decoded).toEqual(config);
    }
  });

  it("returns null when the URL carries no design", () => {
    expect(decodeConfig(new URLSearchParams(""))).toBeNull();
    expect(decodeConfig(new URLSearchParams("utm_source=newsletter"))).toBeNull();
  });

  it("falls back to defaults for unknown ids instead of throwing", () => {
    const decoded = decodeConfig(new URLSearchParams("top=nope&hw=nope&ped=sideways"));
    expect(decoded).toEqual(DEFAULT_CONFIG);
  });
});

describe("lookups", () => {
  it("fall back to the default for unknown ids", () => {
    expect(getFinish("nope").id).toBe(DEFAULT_CONFIG.topId);
    expect(getHardware("nope").id).toBe(DEFAULT_CONFIG.hardwareId);
  });
});

describe("designer upcharge", () => {
  it("flags a design when either top or base is a designer finish", () => {
    expect(usesDesignerFinish(DEFAULT_CONFIG)).toBe(false);
    expect(usesDesignerFinish({ ...DEFAULT_CONFIG, topId: "espresso" })).toBe(true);
    expect(usesDesignerFinish({ ...DEFAULT_CONFIG, baseId: "white" })).toBe(true);
  });
});

describe("buildSpecText", () => {
  it("lists finish makers and codes so a dealer can quote from it", () => {
    const text = buildSpecText({ ...DEFAULT_CONFIG, topId: "african-walnut", baseId: "grey" });
    expect(text).toContain("African Walnut (Wilsonart #7122T-60)");
    expect(text).toContain("Grey (Formica #SG213)");
    expect(text).not.toContain("add 5%");
  });

  it("mentions the designer upcharge only when it applies", () => {
    expect(buildSpecText({ ...DEFAULT_CONFIG, topId: "espresso" })).toContain("add 5%");
  });
});
