import { mkdtempSync, rmSync } from "fs";
import { tmpdir } from "os";
import path from "path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  createDesign,
  deleteDesign,
  getDesign,
  listDesigns,
  upsertDesign,
  validateInput
} from "./designRepo";
import { DEPTH_MAX_CM, WIDTH_MAX_CM } from "./deskLimits";

let tempDir: string;

beforeEach(() => {
  tempDir = mkdtempSync(path.join(tmpdir(), "desk-customizer-test-"));
  process.env.DESK_DATA_DIR = tempDir;
});

afterEach(() => {
  delete process.env.DESK_DATA_DIR;
  rmSync(tempDir, { recursive: true, force: true });
});

const baseInput = {
  name: "Oak desk",
  width: 140,
  depth: 70,
  height: 75,
  color: "#c18f59",
  deskKind: "writing" as const,
  returnSide: "right" as const,
  drawersLeft: false,
  drawersRight: false
};

describe("validateInput", () => {
  it("accepts a well-formed design and passes values through", () => {
    const result = validateInput(baseInput);
    expect(result.width).toBe(140);
    expect(result.depth).toBe(70);
    expect(result.height).toBe(75);
    expect(result.color).toBe("#c18f59");
  });

  it("clamps out-of-range dimensions instead of rejecting them", () => {
    const result = validateInput({ ...baseInput, width: 9999, depth: -50 });
    expect(result.width).toBe(WIDTH_MAX_CM);
    expect(result.depth).toBeGreaterThanOrEqual(0);
    expect(result.depth).toBeLessThanOrEqual(DEPTH_MAX_CM);
  });

  it("throws on a non-numeric width", () => {
    expect(() => validateInput({ ...baseInput, width: "wide" })).toThrow(
      "Invalid width"
    );
  });

  it("throws on a missing or malformed color", () => {
    expect(() => validateInput({ ...baseInput, color: "" })).toThrow(
      "Invalid color"
    );
    expect(() => validateInput({ ...baseInput, color: "orange" })).toThrow(
      "Invalid color"
    );
  });

  it("falls back to a safe deskKind for unrecognized values", () => {
    const result = validateInput({ ...baseInput, deskKind: "sofa" });
    expect(result.deskKind).toBe("writing");
  });

  it("falls back to 'right' for an unrecognized returnSide", () => {
    const result = validateInput({ ...baseInput, returnSide: "sideways" });
    expect(result.returnSide).toBe("right");
  });

  it("rejects a non-object body", () => {
    expect(() => validateInput(null)).toThrow("Invalid body");
  });
});

describe("design CRUD lifecycle", () => {
  it("creates a design with a generated id and timestamp", async () => {
    const design = await createDesign(validateInput(baseInput));
    expect(design.id).toBeTruthy();
    expect(design.updatedAt).toBeTruthy();
    expect(design.name).toBe("Oak desk");
  });

  it("lists designs sorted by most recently updated first", async () => {
    const first = await createDesign(validateInput({ ...baseInput, name: "First" }));
    await new Promise((resolve) => setTimeout(resolve, 5));
    const second = await createDesign(
      validateInput({ ...baseInput, name: "Second" })
    );

    const designs = await listDesigns();
    expect(designs.map((d) => d.id)).toEqual([second.id, first.id]);
  });

  it("gets a design by id, or null if it doesn't exist", async () => {
    const created = await createDesign(validateInput(baseInput));
    expect((await getDesign(created.id))?.name).toBe("Oak desk");
    expect(await getDesign("does-not-exist")).toBeNull();
  });

  it("upserts: updates an existing design in place", async () => {
    const created = await createDesign(validateInput(baseInput));
    const updated = await upsertDesign(
      created.id,
      validateInput({ ...baseInput, name: "Renamed", width: 200 })
    );

    expect(updated.id).toBe(created.id);
    const all = await listDesigns();
    expect(all).toHaveLength(1);
    expect(all[0].name).toBe("Renamed");
    expect(all[0].width).toBe(200);
  });

  it("upserts: creates a new design when the id isn't found", async () => {
    const upserted = await upsertDesign("brand-new-id", validateInput(baseInput));
    expect(upserted.id).toBe("brand-new-id");
    expect(await listDesigns()).toHaveLength(1);
  });

  it("deletes a design and reports whether one was removed", async () => {
    const created = await createDesign(validateInput(baseInput));
    expect(await deleteDesign(created.id)).toBe(true);
    expect(await getDesign(created.id)).toBeNull();
    expect(await deleteDesign(created.id)).toBe(false);
  });
});
