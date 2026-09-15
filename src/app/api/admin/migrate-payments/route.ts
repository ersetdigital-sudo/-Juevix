import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST() {
  const statements = [
    "ALTER TABLE payment_methods ADD COLUMN IF NOT EXISTS type TEXT NOT NULL DEFAULT 'transfer'",
    "ALTER TABLE payment_methods ADD COLUMN IF NOT EXISTS account_number TEXT",
    "ALTER TABLE payment_methods ADD COLUMN IF NOT EXISTS account_name TEXT",
    "ALTER TABLE payment_methods ADD COLUMN IF NOT EXISTS qris_image TEXT",
    "ALTER TABLE payment_methods ADD COLUMN IF NOT EXISTS is_active BOOLEAN NOT NULL DEFAULT TRUE",
    "ALTER TABLE payment_methods ADD COLUMN IF NOT EXISTS icon TEXT",
    "UPDATE payment_methods SET type = 'qris' WHERE category = 'qris'",
  ];

  const results = [];
  for (const sql of statements) {
    const { error } = await supabaseAdmin.rpc("exec_sql", { query: sql });
    if (error) {
      // Try direct approach via query
      results.push({ sql: sql.slice(0, 50), error: error.message });
    } else {
      results.push({ sql: sql.slice(0, 50), ok: true });
    }
  }

  return NextResponse.json({ results });
}
