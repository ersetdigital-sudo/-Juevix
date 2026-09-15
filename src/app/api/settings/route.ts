import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function GET() {
  const { data, error } = await supabaseAdmin
    .from("site_settings")
    .select("*")
    .single();

  if (error || !data) return NextResponse.json({ whatsapp: "6281234567890", email: "halo@juevix.net", site_name: "Juevix", tagline: "Top Up Game, Lebih Mudah", primary_color: "#00D97E", instagram: "@juevix", tiktok: "@juevix", youtube: "@juevix" });
  return NextResponse.json(data);
}
