import {
  deleteDesign,
  getDesign,
  upsertDesign,
  validateInput
} from "@/lib/designRepo";

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  const { id } = await ctx.params;
  const design = await getDesign(id);
  if (!design) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json({ design });
}

export async function PUT(
  req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  const { id } = await ctx.params;
  try {
    const body = await req.json();
    const input = validateInput(body);
    const design = await upsertDesign(id, input);
    return Response.json({ design });
  } catch (e) {
    return Response.json(
      { error: e instanceof Error ? e.message : "Invalid request" },
      { status: 400 }
    );
  }
}

export async function DELETE(
  _req: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  const { id } = await ctx.params;
  const ok = await deleteDesign(id);
  if (!ok) return Response.json({ error: "Not found" }, { status: 404 });
  return Response.json({ ok: true });
}

