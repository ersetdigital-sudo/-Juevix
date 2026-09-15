import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";

export async function POST() {
  const sql = `
DELETE FROM topup_nominals;
DELETE FROM games;

INSERT INTO games (slug, name, category, rating, reviews, developer, image, gradient, label, is_featured, sort_order) VALUES
('mobile-legends', 'Mobile Legends', 'Moba Game', 4.9, '12k', 'Moonton', NULL, 'linear-gradient(140deg,#0a3d33,#12796a)', 'MOBILE\nLEGENDS', true, 0),
('pubg-mobile', 'PUBG Mobile', 'Action', 4.8, '10k', 'Krafton', NULL, 'linear-gradient(140deg,#1a1a2e,#16213e)', 'PUBG\nMOBILE', true, 1),
('free-fire', 'Free Fire', 'Action', 4.7, '9k', 'Garena', NULL, 'linear-gradient(140deg,#b45309,#f59e0b)', 'FREE\nFIRE', true, 2),
('magic-chess', 'Magic Chess', 'Strategy', 4.6, '5k', 'Moonton', NULL, 'linear-gradient(140deg,#4c1d95,#7c3aed)', 'MAGIC\nCHESS', false, 3),
('honor-of-kings', 'Honor of Kings', 'Moba Game', 4.8, '8k', 'Tencent', NULL, 'linear-gradient(140deg,#2a1b3d,#5b2a86)', 'HONOR\nOF KINGS', true, 4),
('roblox', 'Roblox', 'Casual Game', 4.5, '7k', 'Roblox Corp', NULL, 'linear-gradient(140deg,#dc2626,#ef4444)', 'ROBLOX', false, 5);

INSERT INTO topup_nominals (game_slug, label, price, badge, badge_type, original_price, sort_order) VALUES
('mobile-legends', '5 Diamond', 1500, NULL, NULL, NULL, 0),
('mobile-legends', '12 Diamond', 3500, 'Hemat', 'ok', NULL, 1),
('mobile-legends', '50 Diamond', 15000, NULL, NULL, NULL, 2),
('mobile-legends', '100 Diamond', 28000, 'Bonus 5', 'ok', NULL, 3),
('mobile-legends', '200 Diamond', 54000, NULL, NULL, NULL, 4),
('mobile-legends', '300 Diamond', 79000, 'Promo', 'wait', 85000, 5),
('mobile-legends', '500 Diamond', 132000, NULL, NULL, NULL, 6),
('mobile-legends', '1000 Diamond', 255000, 'Bonus 50', 'ok', NULL, 7),
('mobile-legends', '2000 Diamond', 499000, NULL, NULL, NULL, 8);

INSERT INTO topup_nominals (game_slug, label, price, badge, badge_type, original_price, sort_order) VALUES
('pubg-mobile', '60 UC', 16000, NULL, NULL, NULL, 0),
('pubg-mobile', '120 UC', 32000, NULL, NULL, NULL, 1),
('pubg-mobile', '180 UC', 48000, 'Hemat', 'ok', NULL, 2),
('pubg-mobile', '325 UC', 79000, NULL, NULL, NULL, 3),
('pubg-mobile', '660 UC', 155000, 'Bonus 60', 'ok', NULL, 4),
('pubg-mobile', '1800 UC', 399000, NULL, NULL, NULL, 5),
('pubg-mobile', '3850 UC', 799000, 'Promo', 'wait', 850000, 6),
('pubg-mobile', '8100 UC', 1599000, NULL, NULL, NULL, 7),
('pubg-mobile', '16200 UC', 3099000, 'Bonus 1620', 'ok', NULL, 8);

INSERT INTO topup_nominals (game_slug, label, price, badge, badge_type, original_price, sort_order) VALUES
('free-fire', '5 Diamond', 1500, NULL, NULL, NULL, 0),
('free-fire', '12 Diamond', 3000, NULL, NULL, NULL, 1),
('free-fire', '50 Diamond', 12000, 'Hemat', 'ok', NULL, 2),
('free-fire', '100 Diamond', 22000, NULL, NULL, NULL, 3),
('free-fire', '210 Diamond', 45000, 'Bonus 10', 'ok', NULL, 4),
('free-fire', '310 Diamond', 65000, NULL, NULL, NULL, 5),
('free-fire', '520 Diamond', 105000, 'Promo', 'wait', 115000, 6),
('free-fire', '1060 Diamond', 210000, NULL, NULL, NULL, 7),
('free-fire', '2200 Diamond', 420000, 'Bonus 200', 'ok', NULL, 8);

INSERT INTO topup_nominals (game_slug, label, price, badge, badge_type, original_price, sort_order) VALUES
('magic-chess', '5 Diamond', 1500, NULL, NULL, NULL, 0),
('magic-chess', '12 Diamond', 3500, NULL, NULL, NULL, 1),
('magic-chess', '50 Diamond', 15000, 'Hemat', 'ok', NULL, 2),
('magic-chess', '100 Diamond', 28000, NULL, NULL, NULL, 3),
('magic-chess', '200 Diamond', 54000, 'Bonus 10', 'ok', NULL, 4),
('magic-chess', '300 Diamond', 79000, NULL, NULL, NULL, 5),
('magic-chess', '500 Diamond', 132000, 'Promo', 'wait', 145000, 6),
('magic-chess', '1000 Diamond', 255000, NULL, NULL, NULL, 7),
('magic-chess', '2000 Diamond', 499000, 'Bonus 100', 'ok', NULL, 8);

INSERT INTO topup_nominals (game_slug, label, price, badge, badge_type, original_price, sort_order) VALUES
('honor-of-kings', '100 Token', 8000, NULL, NULL, NULL, 0),
('honor-of-kings', '200 Token', 15000, NULL, NULL, NULL, 1),
('honor-of-kings', '400 Token', 30000, 'Hemat', 'ok', NULL, 2),
('honor-of-kings', '600 Token', 45000, NULL, NULL, NULL, 3),
('honor-of-kings', '895 Token', 75000, 'Bonus 50', 'ok', NULL, 4),
('honor-of-kings', '1200 Token', 99000, NULL, NULL, NULL, 5),
('honor-of-kings', '1800 Token', 150000, 'Promo', 'wait', 165000, 6),
('honor-of-kings', '3600 Token', 290000, NULL, NULL, NULL, 7),
('honor-of-kings', '7200 Token', 570000, 'Bonus 720', 'ok', NULL, 8);

INSERT INTO topup_nominals (game_slug, label, price, badge, badge_type, original_price, sort_order) VALUES
('roblox', '80 Robux', 15000, NULL, NULL, NULL, 0),
('roblox', '100 Robux', 18000, NULL, NULL, NULL, 1),
('roblox', '200 Robux', 35000, 'Hemat', 'ok', NULL, 2),
('roblox', '400 Robux', 65000, NULL, NULL, NULL, 3),
('roblox', '500 Robux', 80000, 'Bonus 50', 'ok', NULL, 4),
('roblox', '800 Robux', 125000, NULL, NULL, NULL, 5),
('roblox', '1000 Robux', 170000, 'Promo', 'wait', 185000, 6),
('roblox', '1700 Robux', 280000, NULL, NULL, NULL, 7),
('roblox', '4500 Robux', 700000, 'Bonus 450', 'ok', NULL, 8);
  `;

  const { error } = await supabaseAdmin.rpc("exec_sql", { query: sql });

  if (error) {
    // Fallback: try direct SQL via PostgREST
    const url = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/rest/v1/rpc/exec_sql`;
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: process.env.SUPABASE_SERVICE_ROLE_KEY!,
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY!}`,
      },
      body: JSON.stringify({ query: sql }),
    });

    if (!res.ok) {
      // Manual fallback: delete and insert one by one
      await supabaseAdmin.from("topup_nominals").delete().neq("id", 0);
      await supabaseAdmin.from("games").delete().neq("id", 0);

      const games = [
        { slug: "mobile-legends", name: "Mobile Legends", category: "Moba Game", rating: 4.9, reviews: "12k", developer: "Moonton", gradient: "linear-gradient(140deg,#0a3d33,#12796a)", label: "MOBILE\nLEGENDS", is_featured: true, sort_order: 0 },
        { slug: "pubg-mobile", name: "PUBG Mobile", category: "Action", rating: 4.8, reviews: "10k", developer: "Krafton", gradient: "linear-gradient(140deg,#1a1a2e,#16213e)", label: "PUBG\nMOBILE", is_featured: true, sort_order: 1 },
        { slug: "free-fire", name: "Free Fire", category: "Action", rating: 4.7, reviews: "9k", developer: "Garena", gradient: "linear-gradient(140deg,#b45309,#f59e0b)", label: "FREE\nFIRE", is_featured: true, sort_order: 2 },
        { slug: "magic-chess", name: "Magic Chess", category: "Strategy", rating: 4.6, reviews: "5k", developer: "Moonton", gradient: "linear-gradient(140deg,#4c1d95,#7c3aed)", label: "MAGIC\nCHESS", is_featured: false, sort_order: 3 },
        { slug: "honor-of-kings", name: "Honor of Kings", category: "Moba Game", rating: 4.8, reviews: "8k", developer: "Tencent", gradient: "linear-gradient(140deg,#2a1b3d,#5b2a86)", label: "HONOR\nOF KINGS", is_featured: true, sort_order: 4 },
        { slug: "roblox", name: "Roblox", category: "Casual Game", rating: 4.5, reviews: "7k", developer: "Roblox Corp", gradient: "linear-gradient(140deg,#dc2626,#ef4444)", label: "ROBLOX", is_featured: false, sort_order: 5 },
      ];

      const { error: gErr } = await supabaseAdmin.from("games").insert(games);
      if (gErr) return NextResponse.json({ error: gErr.message }, { status: 500 });

      const nominals = [
        // Mobile Legends
        { game_slug: "mobile-legends", label: "5 Diamond", price: 1500, sort_order: 0 },
        { game_slug: "mobile-legends", label: "12 Diamond", price: 3500, badge: "Hemat", badge_type: "ok", sort_order: 1 },
        { game_slug: "mobile-legends", label: "50 Diamond", price: 15000, sort_order: 2 },
        { game_slug: "mobile-legends", label: "100 Diamond", price: 28000, badge: "Bonus 5", badge_type: "ok", sort_order: 3 },
        { game_slug: "mobile-legends", label: "200 Diamond", price: 54000, sort_order: 4 },
        { game_slug: "mobile-legends", label: "300 Diamond", price: 79000, badge: "Promo", badge_type: "wait", original_price: 85000, sort_order: 5 },
        { game_slug: "mobile-legends", label: "500 Diamond", price: 132000, sort_order: 6 },
        { game_slug: "mobile-legends", label: "1000 Diamond", price: 255000, badge: "Bonus 50", badge_type: "ok", sort_order: 7 },
        { game_slug: "mobile-legends", label: "2000 Diamond", price: 499000, sort_order: 8 },
        // PUBG Mobile
        { game_slug: "pubg-mobile", label: "60 UC", price: 16000, sort_order: 0 },
        { game_slug: "pubg-mobile", label: "120 UC", price: 32000, sort_order: 1 },
        { game_slug: "pubg-mobile", label: "180 UC", price: 48000, badge: "Hemat", badge_type: "ok", sort_order: 2 },
        { game_slug: "pubg-mobile", label: "325 UC", price: 79000, sort_order: 3 },
        { game_slug: "pubg-mobile", label: "660 UC", price: 155000, badge: "Bonus 60", badge_type: "ok", sort_order: 4 },
        { game_slug: "pubg-mobile", label: "1800 UC", price: 399000, sort_order: 5 },
        { game_slug: "pubg-mobile", label: "3850 UC", price: 799000, badge: "Promo", badge_type: "wait", original_price: 850000, sort_order: 6 },
        { game_slug: "pubg-mobile", label: "8100 UC", price: 1599000, sort_order: 7 },
        { game_slug: "pubg-mobile", label: "16200 UC", price: 3099000, badge: "Bonus 1620", badge_type: "ok", sort_order: 8 },
        // Free Fire
        { game_slug: "free-fire", label: "5 Diamond", price: 1500, sort_order: 0 },
        { game_slug: "free-fire", label: "12 Diamond", price: 3000, sort_order: 1 },
        { game_slug: "free-fire", label: "50 Diamond", price: 12000, badge: "Hemat", badge_type: "ok", sort_order: 2 },
        { game_slug: "free-fire", label: "100 Diamond", price: 22000, sort_order: 3 },
        { game_slug: "free-fire", label: "210 Diamond", price: 45000, badge: "Bonus 10", badge_type: "ok", sort_order: 4 },
        { game_slug: "free-fire", label: "310 Diamond", price: 65000, sort_order: 5 },
        { game_slug: "free-fire", label: "520 Diamond", price: 105000, badge: "Promo", badge_type: "wait", original_price: 115000, sort_order: 6 },
        { game_slug: "free-fire", label: "1060 Diamond", price: 210000, sort_order: 7 },
        { game_slug: "free-fire", label: "2200 Diamond", price: 420000, badge: "Bonus 200", badge_type: "ok", sort_order: 8 },
        // Magic Chess
        { game_slug: "magic-chess", label: "5 Diamond", price: 1500, sort_order: 0 },
        { game_slug: "magic-chess", label: "12 Diamond", price: 3500, sort_order: 1 },
        { game_slug: "magic-chess", label: "50 Diamond", price: 15000, badge: "Hemat", badge_type: "ok", sort_order: 2 },
        { game_slug: "magic-chess", label: "100 Diamond", price: 28000, sort_order: 3 },
        { game_slug: "magic-chess", label: "200 Diamond", price: 54000, badge: "Bonus 10", badge_type: "ok", sort_order: 4 },
        { game_slug: "magic-chess", label: "300 Diamond", price: 79000, sort_order: 5 },
        { game_slug: "magic-chess", label: "500 Diamond", price: 132000, badge: "Promo", badge_type: "wait", original_price: 145000, sort_order: 6 },
        { game_slug: "magic-chess", label: "1000 Diamond", price: 255000, sort_order: 7 },
        { game_slug: "magic-chess", label: "2000 Diamond", price: 499000, badge: "Bonus 100", badge_type: "ok", sort_order: 8 },
        // Honor of Kings
        { game_slug: "honor-of-kings", label: "100 Token", price: 8000, sort_order: 0 },
        { game_slug: "honor-of-kings", label: "200 Token", price: 15000, sort_order: 1 },
        { game_slug: "honor-of-kings", label: "400 Token", price: 30000, badge: "Hemat", badge_type: "ok", sort_order: 2 },
        { game_slug: "honor-of-kings", label: "600 Token", price: 45000, sort_order: 3 },
        { game_slug: "honor-of-kings", label: "895 Token", price: 75000, badge: "Bonus 50", badge_type: "ok", sort_order: 4 },
        { game_slug: "honor-of-kings", label: "1200 Token", price: 99000, sort_order: 5 },
        { game_slug: "honor-of-kings", label: "1800 Token", price: 150000, badge: "Promo", badge_type: "wait", original_price: 165000, sort_order: 6 },
        { game_slug: "honor-of-kings", label: "3600 Token", price: 290000, sort_order: 7 },
        { game_slug: "honor-of-kings", label: "7200 Token", price: 570000, badge: "Bonus 720", badge_type: "ok", sort_order: 8 },
        // Roblox
        { game_slug: "roblox", label: "80 Robux", price: 15000, sort_order: 0 },
        { game_slug: "roblox", label: "100 Robux", price: 18000, sort_order: 1 },
        { game_slug: "roblox", label: "200 Robux", price: 35000, badge: "Hemat", badge_type: "ok", sort_order: 2 },
        { game_slug: "roblox", label: "400 Robux", price: 65000, sort_order: 3 },
        { game_slug: "roblox", label: "500 Robux", price: 80000, badge: "Bonus 50", badge_type: "ok", sort_order: 4 },
        { game_slug: "roblox", label: "800 Robux", price: 125000, sort_order: 5 },
        { game_slug: "roblox", label: "1000 Robux", price: 170000, badge: "Promo", badge_type: "wait", original_price: 185000, sort_order: 6 },
        { game_slug: "roblox", label: "1700 Robux", price: 280000, sort_order: 7 },
        { game_slug: "roblox", label: "4500 Robux", price: 700000, badge: "Bonus 450", badge_type: "ok", sort_order: 8 },
      ];

      const { error: nErr } = await supabaseAdmin.from("topup_nominals").insert(nominals);
      if (nErr) return NextResponse.json({ error: nErr.message }, { status: 500 });

      return NextResponse.json({ success: true, method: "js-client" });
    }

    return NextResponse.json({ success: true, method: "rpc" });
  }

  return NextResponse.json({ success: true, method: "rpc" });
}
