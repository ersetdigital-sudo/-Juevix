-- ============================================
-- MIGRATION: Insert 6 Games + 9 Nominals each
-- Run this in Supabase SQL Editor
-- ============================================

-- Hapus data lama
DELETE FROM topup_nominals;
DELETE FROM games;

-- ============================================
-- GAMES
-- ============================================

INSERT INTO games (slug, name, category, rating, reviews, developer, image, gradient, label, is_featured, sort_order) VALUES
('mobile-legends', 'Mobile Legends', 'Moba Game', 4.9, '12k', 'Moonton', NULL, 'linear-gradient(140deg,#0a3d33,#12796a)', 'MOBILE\nLEGENDS', true, 0),
('pubg-mobile', 'PUBG Mobile', 'Action', 4.8, '10k', 'Krafton', NULL, 'linear-gradient(140deg,#1a1a2e,#16213e)', 'PUBG\nMOBILE', true, 1),
('free-fire', 'Free Fire', 'Action', 4.7, '9k', 'Garena', NULL, 'linear-gradient(140deg,#b45309,#f59e0b)', 'FREE\nFIRE', true, 2),
('magic-chess', 'Magic Chess', 'Strategy', 4.6, '5k', 'Moonton', NULL, 'linear-gradient(140deg,#4c1d95,#7c3aed)', 'MAGIC\nCHESS', false, 3),
('honor-of-kings', 'Honor of Kings', 'Moba Game', 4.8, '8k', 'Tencent', NULL, 'linear-gradient(140deg,#2a1b3d,#5b2a86)', 'HONOR\nOF KINGS', true, 4),
('roblox', 'Roblox', 'Casual Game', 4.5, '7k', 'Roblox Corp', NULL, 'linear-gradient(140deg,#dc2626,#ef4444)', 'ROBLOX', false, 5);

-- ============================================
-- MOBILE LEGENDS — 9 Nominals
-- ============================================

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

-- ============================================
-- PUBG MOBILE — 9 Nominals
-- ============================================

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

-- ============================================
-- FREE FIRE — 9 Nominals
-- ============================================

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

-- ============================================
-- MAGIC CHESS — 9 Nominals
-- ============================================

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

-- ============================================
-- HONOR OF KINGS — 9 Nominals
-- ============================================

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

-- ============================================
-- ROBLOX — 9 Nominals
-- ============================================

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
