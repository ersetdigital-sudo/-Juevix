const SQL = `ALTER TABLE payment_methods ADD COLUMN IF NOT EXISTS type TEXT NOT NULL DEFAULT 'transfer'; ALTER TABLE payment_methods ADD COLUMN IF NOT EXISTS account_number TEXT; ALTER TABLE payment_methods ADD COLUMN IF NOT EXISTS account_name TEXT; ALTER TABLE payment_methods ADD COLUMN IF NOT EXISTS qris_image TEXT; ALTER TABLE payment_methods ADD COLUMN IF NOT EXISTS is_active BOOLEAN NOT NULL DEFAULT TRUE; ALTER TABLE payment_methods ADD COLUMN IF NOT EXISTS icon TEXT; UPDATE payment_methods SET type = 'qris' WHERE category = 'qris';`;

export async function POST() {
  const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/`;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  // Try each statement individually
  const statements = SQL.split(";").filter(s => s.trim());
  const results = [];

  for (const stmt of statements) {
    try {
      const res = await fetch(url + "rpc/exec_sql", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: key!,
          Authorization: `Bearer ${key!}`,
        },
        body: JSON.stringify({ query: stmt.trim() }),
      });
      const data = await res.json();
      results.push({ ok: res.ok, data });
    } catch (e: any) {
      results.push({ ok: false, error: e.message });
    }
  }

  return Response.json({ results });
}
