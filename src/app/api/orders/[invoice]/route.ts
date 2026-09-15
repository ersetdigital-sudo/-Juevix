import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ invoice: string }> }
) {
  const { invoice } = await params;
  const { data, error } = await supabaseAdmin
    .from("orders")
    .select("*")
    .eq("invoice", invoice)
    .single();

  if (error) return NextResponse.json({ error: "Invoice tidak ditemukan" }, { status: 404 });
  return NextResponse.json(data);
}
