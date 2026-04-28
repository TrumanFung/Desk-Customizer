import { createDesign, listDesigns, validateInput } from "@/lib/designRepo";

export async function GET() {
  const designs = await listDesigns();
  return Response.json({ designs });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const input = validateInput(body);
    const design = await createDesign(input);
    return Response.json({ design }, { status: 201 });
  } catch (e) {
    return Response.json(
      { error: e instanceof Error ? e.message : "Invalid request" },
      { status: 400 }
    );
  }
}

