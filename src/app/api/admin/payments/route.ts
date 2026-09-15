import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

const DB_COLUMNS = ["category", "name", "label", "code", "color", "sort_order", "type", "account_number", "account_name", "qris_image", "is_active", "icon"];

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("payment_methods")
    .select("*")
    .order("sort_order");

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const filtered: Record<string, unknown> = {};
  for (const key of DB_COLUMNS) {
    if (body[key] !== undefined && body[key] !== null) {
      filtered[key] = body[key];
    }
  }

  if (!filtered.name) return NextResponse.json({ error: "Nama wajib diisi" }, { status: 400 });
  if (!filtered.label) filtered.label = filtered.name;
  if (!filtered.code) filtered.code = String(filtered.name).slice(0, 6).toUpperCase();
  if (!filtered.color) filtered.color = "#666666";
  if (!filtered.type) filtered.type = "transfer";
  if (filtered.is_active === undefined) filtered.is_active = true;

  const { data, error } = await supabaseAdmin
    .from("payment_methods")
    .insert(filtered)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
