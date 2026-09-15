import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function GET() {
  const [games, categories, nominals, payments, slides, settings] =
    await Promise.all([
      supabaseAdmin.from("games").select("*").order("sort_order"),
      supabaseAdmin.from("categories").select("*").order("sort_order"),
      supabaseAdmin.from("topup_nominals").select("*").order("sort_order"),
      supabaseAdmin.from("payment_methods").select("*").order("sort_order"),
      supabaseAdmin.from("hero_slides").select("*").order("sort_order"),
      supabaseAdmin.from("site_settings").select("*").single(),
    ]);

  return NextResponse.json({
    stats: {
      games: games.data?.length || 0,
      categories: categories.data?.length || 0,
      nominals: nominals.data?.length || 0,
      payments: payments.data?.length || 0,
      slides: slides.data?.length || 0,
    },
    settings: settings.data,
  });
}
