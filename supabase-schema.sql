-- ============================================
-- JUEVIX - Database Schema
-- Run this in Supabase SQL Editor
-- ============================================

-- KATEGORIES
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  icon TEXT NOT NULL DEFAULT 'home',
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- PLATFORMS
CREATE TABLE IF NOT EXISTS platforms (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  icon TEXT NOT NULL DEFAULT 'grid',
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- GAMES
CREATE TABLE IF NOT EXISTS games (
  id SERIAL PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  platform TEXT[] DEFAULT '{}',
  rating NUMERIC(2,1) DEFAULT 0,
  reviews TEXT DEFAULT '0',
  developer TEXT,
  image TEXT,
  gradient TEXT,
  label TEXT,
  is_featured BOOLEAN DEFAULT FALSE,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- TOPUP NOMINALS
CREATE TABLE IF NOT EXISTS topup_nominals (
  id SERIAL PRIMARY KEY,
  game_slug TEXT NOT NULL REFERENCES games(slug) ON DELETE CASCADE,
  label TEXT NOT NULL,
  price INT NOT NULL,
  badge TEXT,
  badge_type TEXT CHECK (badge_type IN ('ok', 'wait')),
  original_price INT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- PAYMENT METHODS
CREATE TABLE IF NOT EXISTS payment_methods (
  id SERIAL PRIMARY KEY,
  category TEXT NOT NULL,
  name TEXT NOT NULL,
  label TEXT NOT NULL,
  code TEXT NOT NULL,
  color TEXT NOT NULL DEFAULT '#666',
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- HERO SLIDES
CREATE TABLE IF NOT EXISTS hero_slides (
  id SERIAL PRIMARY KEY,
  image TEXT NOT NULL,
  alt TEXT NOT NULL,
  href TEXT NOT NULL,
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- SEED DATA
-- ============================================

INSERT INTO categories (name, slug, icon, sort_order) VALUES
('Semua Game', 'semua', 'home', 0),
('Moba Game', 'moba', 'gamepad', 1),
('RPG', 'rpg', 'sword', 2),
('Casual Game', 'casual', 'smile', 3),
('Strategy', 'strategy', 'building', 4),
('Simulator', 'simulator', 'clock', 5),
('Sports Game', 'sports', 'globe', 6),
('Adventure', 'adventure', 'layers', 7);

INSERT INTO platforms (name, slug, icon, sort_order) VALUES
('Semua Platform', 'semua', 'grid', 0),
('Mobile', 'mobile', 'phone', 1),
('PC', 'pc', 'monitor', 2),
('Nintendo', 'nintendo', 'console', 3),
('Playstation 4', 'ps4', 'play', 4),
('Playstation 5', 'ps5', 'play', 5),
('X-Box', 'xbox', 'xbox', 6);

INSERT INTO games (slug, name, category, rating, reviews, developer, image, sort_order) VALUES
('mobile-legends', 'Mobile Legends', 'Moba Game', 4.9, '12k', 'Moonton', '/ml-banner.png', 0);

INSERT INTO games (slug, name, category, rating, reviews, gradient, label, sort_order) VALUES
('honor-of-kings', 'Honor of Kings', 'Moba Game', 4.8, '8k', 'linear-gradient(140deg,#2a1b3d,#5b2a86)', 'HONOR\nOF KINGS', 1),
('arena-of-valor', 'Arena of Valor', 'Moba Game', 4.7, '5k', 'linear-gradient(140deg,#0a3d33,#12796a)', 'ARENA of\nVALOR', 2),
('dota-2', 'Dota 2', 'Moba Game', 4.8, '6k', 'linear-gradient(140deg,#2b0d0d,#7f1d1d)', 'DOTA 2', 3),
('league-of-legends', 'League of Legends', 'Moba Game', 4.9, '10k', 'linear-gradient(140deg,#0b1d4a,#2563eb)', 'LEAGUE of\nLEGENDS', 4),
('pokemon-unite', 'Pokémon Unite', 'Moba Game', 4.6, '4k', 'linear-gradient(140deg,#f5b700,#f97316)', 'POKÉMON\nUNITE', 5),
('heroes-evolved', 'Heroes Evolved', 'Moba Game', 4.5, '3k', 'linear-gradient(140deg,#3f2a12,#a16207)', 'HEROES\nEVOLVED', 6),
('vainglory', 'Vainglory', 'Moba Game', 4.4, '2k', 'linear-gradient(140deg,#241548,#6d28d9)', 'VAIN\nGLORY', 7);

INSERT INTO topup_nominals (game_slug, label, price, badge, badge_type, original_price, sort_order) VALUES
('mobile-legends', '50 Diamond', 14500, NULL, NULL, NULL, 0),
('mobile-legends', '100 Diamond', 28000, 'Bonus 5', 'ok', NULL, 1),
('mobile-legends', '200 Diamond', 54000, NULL, NULL, NULL, 2),
('mobile-legends', '300 Diamond', 79000, 'Promo', 'wait', 85000, 3),
('mobile-legends', '500 Diamond', 132000, NULL, NULL, NULL, 4),
('mobile-legends', '1000 Diamond', 255000, 'Bonus 50', 'ok', NULL, 5),
('mobile-legends', '2000 Diamond', 499000, NULL, NULL, NULL, 6),
('mobile-legends', 'Weekly Diamond Pass', 65000, 'Promo', 'wait', NULL, 7);

INSERT INTO payment_methods (category, name, label, code, color, sort_order) VALUES
('qris', 'QRIS', 'QRIS', 'QR', '#f2f6f4', 0),
('ewallet', 'Dana', 'DANA', 'DANA', '#118eea', 0),
('ewallet', 'OVO', 'OVO', 'OVO', '#4c3494', 1),
('ewallet', 'GoPay', 'GoPay', 'GO', '#00aed6', 2),
('ewallet', 'ShopeePay', 'ShopeePay', 'SP', '#ee4d2d', 3),
('va', 'BCA Virtual Account', 'BCA', 'BCA', '#0060af', 0),
('va', 'BRI Virtual Account', 'BRI', 'BRI', '#00529c', 1),
('va', 'BNI Virtual Account', 'BNI', 'BNI', '#f15a23', 2),
('va', 'Mandiri Virtual Account', 'Mandiri', 'MDR', '#003d79', 3),
('minimarket', 'Alfamart', 'Alfamart', 'ALFA', '#e11d48', 0),
('minimarket', 'Indomaret', 'Indomaret', 'INDO', '#1d4ed8', 1);

INSERT INTO hero_slides (image, alt, href, sort_order) VALUES
('/ml-banner.png', 'Top Up Game Favorit Kamu — main lebih seru, lebih untung', '/game/mobile-legends', 0),
('/pubg-banner.png', 'Top Up UC PUBG Lebih Untung — survive more, play more', '/game/mobile-legends', 1),
('/genshin-banner.png', 'Top Up Genesis Crystals Genshin Impact — adventure awaits', '/game/mobile-legends', 2);
