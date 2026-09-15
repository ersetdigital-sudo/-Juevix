import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

const DB_COLUMNS = ["category", "name", "label", "code", "color", "sort_order"];

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();

  // Only send columns that exist in the database
  const filtered: Record<string, unknown> = {};
  for (const key of DB_COLUMNS) {
    if (body[key] !== undefined) {
      filtered[key] = body[key];
    }
  }

  const { data, error } = await supabaseAdmin
    .from("payment_methods")
    .update(filtered)
    .eq("id", id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { error } = await supabaseAdmin.from("payment_methods").delete().eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
