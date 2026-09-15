import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

const VALID_COLUMNS = [
  "category", "name", "label", "code", "color", "sort_order",
  "type", "account_number", "account_name", "qris_image", "is_active", "icon",
];

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

  // Filter only valid columns
  const filtered: Record<string, unknown> = {};
  for (const key of VALID_COLUMNS) {
    if (body[key] !== undefined && body[key] !== null) {
      filtered[key] = body[key];
    }
  }

  const { data, error } = await supabaseAdmin
    .from("payment_methods")
    .insert(filtered)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
