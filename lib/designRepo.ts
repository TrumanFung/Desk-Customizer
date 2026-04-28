import { promises as fs } from "fs";
import path from "path";
import type {
  DeskDesign,
  DeskDesignInput,
  DeskKind,
  ReturnSide
} from "@/lib/types";

const DESK_KINDS: DeskKind[] = ["writing", "executive", "l-shaped"];

function normalizeReturnSide(v: unknown): ReturnSide {
  return v === "left" ? "left" : "right";
}

function normalizeDeskKind(v: unknown): DeskKind {
  return typeof v === "string" && DESK_KINDS.includes(v as DeskKind)
    ? (v as DeskKind)
    : "writing";
}

type StoreShape = {
  designs: DeskDesign[];
};

function dataFilePath() {
  // Keep this inside the project so it persists without a DB.
  return path.join(process.cwd(), "lib", "data", "designs.json");
}

async function ensureDirExists(filePath: string) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
}

async function readStore(): Promise<StoreShape> {
  const filePath = dataFilePath();
  try {
    const raw = await fs.readFile(filePath, "utf8");
    const parsed = JSON.parse(raw) as StoreShape;
    if (!parsed || !Array.isArray(parsed.designs)) return { designs: [] };
    return {
      designs: parsed.designs.map((d) => ({
        ...d,
        deskKind: normalizeDeskKind((d as DeskDesign).deskKind),
        returnSide: normalizeReturnSide((d as Partial<DeskDesign>).returnSide)
      }))
    };
  } catch (e) {
    // If file doesn't exist or is invalid, start fresh.
    return { designs: [] };
  }
}

async function writeStore(store: StoreShape) {
  const filePath = dataFilePath();
  await ensureDirExists(filePath);
  await fs.writeFile(filePath, JSON.stringify(store, null, 2), "utf8");
}

function nowIso() {
  return new Date().toISOString();
}

function newId() {
  // Minimal unique-enough ID for an MVP (no extra deps).
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

export function validateInput(input: unknown): DeskDesignInput {
  if (!input || typeof input !== "object") throw new Error("Invalid body");
  const i = input as Partial<DeskDesignInput>;

  const width = Number(i.width);
  const depth = Number(i.depth);
  const height = Number(i.height);
  if (!Number.isFinite(width)) throw new Error("Invalid width");
  if (!Number.isFinite(depth)) throw new Error("Invalid depth");
  if (!Number.isFinite(height)) throw new Error("Invalid height");

  const color = typeof i.color === "string" ? i.color : "";
  if (!color) throw new Error("Invalid color");

  const deskKind = normalizeDeskKind(i.deskKind);
  const returnSide = normalizeReturnSide(i.returnSide);

  return {
    id: typeof i.id === "string" ? i.id : undefined,
    name: typeof i.name === "string" ? i.name : undefined,
    width,
    depth,
    height,
    color,
    deskKind,
    returnSide,
    drawersLeft: Boolean(i.drawersLeft),
    drawersRight: Boolean(i.drawersRight)
  };
}

export async function listDesigns(): Promise<DeskDesign[]> {
  const store = await readStore();
  return [...store.designs].sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
}

export async function getDesign(id: string): Promise<DeskDesign | null> {
  const store = await readStore();
  return store.designs.find((d) => d.id === id) ?? null;
}

export async function createDesign(input: DeskDesignInput): Promise<DeskDesign> {
  const store = await readStore();
  const design: DeskDesign = {
    id: newId(),
    name: input.name,
    width: input.width,
    depth: input.depth,
    height: input.height,
    color: input.color,
    deskKind: input.deskKind,
    returnSide: input.returnSide,
    drawersLeft: input.drawersLeft,
    drawersRight: input.drawersRight,
    updatedAt: nowIso()
  };
  store.designs.push(design);
  await writeStore(store);
  return design;
}

export async function upsertDesign(
  id: string,
  input: DeskDesignInput
): Promise<DeskDesign> {
  const store = await readStore();
  const idx = store.designs.findIndex((d) => d.id === id);
  const design: DeskDesign = {
    id,
    name: input.name,
    width: input.width,
    depth: input.depth,
    height: input.height,
    color: input.color,
    deskKind: input.deskKind,
    returnSide: input.returnSide,
    drawersLeft: input.drawersLeft,
    drawersRight: input.drawersRight,
    updatedAt: nowIso()
  };

  if (idx >= 0) store.designs[idx] = design;
  else store.designs.push(design);

  await writeStore(store);
  return design;
}

export async function deleteDesign(id: string): Promise<boolean> {
  const store = await readStore();
  const before = store.designs.length;
  store.designs = store.designs.filter((d) => d.id !== id);
  const deleted = store.designs.length !== before;
  if (deleted) await writeStore(store);
  return deleted;
}

