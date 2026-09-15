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

  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10).replace(/-/g, "");
  const rand = Math.floor(Math.random() * 9000) + 1000;
  const invoice = `JVX-${dateStr}-${rand}`;

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
      admin_fee: body.admin_fee || 1000,
      total: body.total,
      payment_method: body.payment_method,
      status: "pending",
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
