import { mkdtempSync, rmSync } from "fs";
import { tmpdir } from "os";
import path from "path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { createDesign, validateInput } from "@/lib/designRepo";
import { DELETE, GET, PUT } from "./route";

let tempDir: string;

beforeEach(() => {
  tempDir = mkdtempSync(path.join(tmpdir(), "desk-customizer-test-"));
  process.env.DESK_DATA_DIR = tempDir;
});

afterEach(() => {
  delete process.env.DESK_DATA_DIR;
  rmSync(tempDir, { recursive: true, force: true });
});

const validBody = {
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

function ctxFor(id: string) {
  return { params: Promise.resolve({ id }) };
}

describe("GET /api/designs/:id", () => {
  it("returns the design when it exists", async () => {
    const created = await createDesign(validateInput(validBody));
    const res = await GET(new Request("http://localhost"), ctxFor(created.id));
    expect(res.status).toBe(200);
    expect((await res.json()).design.id).toBe(created.id);
  });

  it("returns 404 when it doesn't", async () => {
    const res = await GET(new Request("http://localhost"), ctxFor("missing"));
    expect(res.status).toBe(404);
  });
});

describe("PUT /api/designs/:id", () => {
  it("updates the design in place", async () => {
    const created = await createDesign(validateInput(validBody));
    const req = new Request("http://localhost", {
      method: "PUT",
      body: JSON.stringify({ ...validBody, name: "Renamed" })
    });

    const res = await PUT(req, ctxFor(created.id));
    expect(res.status).toBe(200);
    expect((await res.json()).design.name).toBe("Renamed");
  });

  it("returns 400 for invalid input", async () => {
    const created = await createDesign(validateInput(validBody));
    const req = new Request("http://localhost", {
      method: "PUT",
      body: JSON.stringify({ ...validBody, width: "wide" })
    });

    const res = await PUT(req, ctxFor(created.id));
    expect(res.status).toBe(400);
  });
});

describe("DELETE /api/designs/:id", () => {
  it("deletes an existing design", async () => {
    const created = await createDesign(validateInput(validBody));
    const res = await DELETE(new Request("http://localhost"), ctxFor(created.id));
    expect(res.status).toBe(200);
    expect((await res.json()).ok).toBe(true);
  });

  it("returns 404 for a design that doesn't exist", async () => {
    const res = await DELETE(new Request("http://localhost"), ctxFor("missing"));
    expect(res.status).toBe(404);
  });
});
