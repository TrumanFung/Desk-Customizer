import { mkdtempSync, rmSync } from "fs";
import { tmpdir } from "os";
import path from "path";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { GET, POST } from "./route";

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
  deskKind: "writing",
  returnSide: "right",
  drawersLeft: false,
  drawersRight: false
};

describe("GET /api/designs", () => {
  it("returns an empty list when nothing has been saved", async () => {
    const res = await GET();
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.designs).toEqual([]);
  });
});

describe("POST /api/designs", () => {
  it("creates a design and returns 201", async () => {
    const req = new Request("http://localhost/api/designs", {
      method: "POST",
      body: JSON.stringify(validBody)
    });

    const res = await POST(req);
    expect(res.status).toBe(201);
    const body = await res.json();
    expect(body.design.id).toBeTruthy();
    expect(body.design.name).toBe("Oak desk");

    const list = await (await GET()).json();
    expect(list.designs).toHaveLength(1);
  });

  it("returns 400 with an error message for invalid input", async () => {
    const req = new Request("http://localhost/api/designs", {
      method: "POST",
      body: JSON.stringify({ ...validBody, color: "not-a-color" })
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toBe("Invalid color");
  });
});
