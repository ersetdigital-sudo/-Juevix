import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function PUT(req: NextRequest) {
  const { updates } = await req.json();

  if (!updates || !Array.isArray(updates)) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  for (const u of updates) {
    await supabaseAdmin
      .from("hero_slides")
      .update({ sort_order: u.sort_order })
      .eq("id", u.id);
  }

  return NextResponse.json({ success: true });
}
