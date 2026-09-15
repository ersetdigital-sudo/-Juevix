import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

// Only columns that exist in the payment_methods table
const DB_COLUMNS = ["category", "name", "label", "code", "color", "sort_order"];

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

  // Only send columns that exist in the database
  const filtered: Record<string, unknown> = {};
  for (const key of DB_COLUMNS) {
    if (body[key] !== undefined && body[key] !== null) {
      filtered[key] = body[key];
    }
  }

  // Ensure required fields
  if (!filtered.name) return NextResponse.json({ error: "Nama wajib diisi" }, { status: 400 });
  if (!filtered.category) filtered.category = "ewallet";
  if (!filtered.label) filtered.label = filtered.name;
  if (!filtered.code) filtered.code = String(filtered.name).slice(0, 6).toUpperCase();
  if (!filtered.color) filtered.color = "#666666";

  const { data, error } = await supabaseAdmin
    .from("payment_methods")
    .insert(filtered)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
