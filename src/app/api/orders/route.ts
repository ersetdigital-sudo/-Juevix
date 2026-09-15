import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { data: settings } = await supabaseAdmin
    .from("site_settings")
    .select("admin_fee, invoice_prefix")
    .single();

  const prefix = settings?.invoice_prefix || "JVX";
  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10).replace(/-/g, "");
  const rand = Math.floor(Math.random() * 9000) + 1000;
  const invoice = `${prefix}-${dateStr}-${rand}`;

  const adminFee = body.admin_fee ?? settings?.admin_fee ?? 1000;

  const { data, error } = await supabaseAdmin
    .from("orders")
    .insert({
      invoice,
      game_name: body.game_name,
      game_slug: body.game_slug,
      user_id: body.user_id,
      server_id: body.server_id,
      nickname: body.nickname || null,
      product_label: body.product_label,
      price: body.price,
      admin_fee: adminFee,
      total: body.total,
      payment_method: body.payment_method,
      status: "pending",
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
