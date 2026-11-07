import { describe, expect, it } from "vitest";
import { luminance, shadeHex } from "./color";

describe("shadeHex", () => {
  it("darkens toward black and lightens toward white", () => {
    expect(shadeHex("#808080", -100)).toBe("#000000");
    expect(shadeHex("#808080", 100)).toBe("#ffffff");
    expect(shadeHex("#808080", 0)).toBe("#808080");
  });

  it("expands 3-digit hex", () => {
    expect(shadeHex("#fff", -100)).toBe("#000000");
  });
});

describe("luminance", () => {
  it("orders black < mid grey < white", () => {
    expect(luminance("#000000")).toBe(0);
    expect(luminance("#ffffff")).toBeCloseTo(1);
    expect(luminance("#808080")).toBeGreaterThan(luminance("#000000"));
    expect(luminance("#808080")).toBeLessThan(luminance("#ffffff"));
  });
});
