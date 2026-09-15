<div align="center">

# ⚡ Juevix

### Top Up Game, Lebih Mudah

**Platform top up diamond, gems, dan voucher game favorit kamu.  
Proses instan 24 jam, harga termurah, transaksi aman.**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-MIT-00D97E?style=flat-square)](#)

</div>

---

## Preview

<div align="center">

![Juevix Preview](public/9ddb81da-7b77-4659-8019-49f3ed9f7ef2.png)

</div>

---

## Fitur Utama

| Fitur | Deskripsi |
|-------|-----------|
| 🎮 **Game Catalog** | Katalog game lengkap dengan filter kategori & platform |
| ⚡ **Instant Top Up** | Proses top up otomatis dalam hitungan detik |
| 💳 **Multi Pembayaran** | QRIS, e-wallet (DANA, OVO, GoPay, ShopeePay), VA, minimarket |
| 🔍 **Cek Nickname** | Verifikasi ID game sebelum bayar |
| 📊 **Cek Transaksi** | Lacak status pesanan real-time dengan invoice |
| 📱 **Responsive** | Mobile-first design, sempurna di semua device |
| 🌙 **Dark Theme** | UI gelap premium dengan aksen neon hijau |

---

## Halaman

| Route | Halaman |
|-------|---------|
| `/` | Homepage — Hero slider + katalog game |
| `/game/[slug]` | Detail game — Pilih nominal & metode bayar |
| `/pembayaran` | Halaman pembayaran dengan countdown timer |
| `/cek-transaksi` | Tracking status transaksi via invoice |

---

## Tech Stack

- **Framework:** Next.js 16 (App Router + Turbopack)
- **UI:** React 19 + Tailwind CSS 4
- **Animation:** Framer Motion
- **Slider:** Swiper.js
- **Language:** TypeScript
- **Font:** Plus Jakarta Sans + Sora

---

## Getting Started

```bash
# Clone
git clone https://github.com/ersetdigital-sudo/-Juevix.git
cd -Juevix

# Install dependencies
npm install

# Run dev server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000)

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx              # Homepage
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles
│   ├── game/[slug]/page.tsx  # Game detail
│   ├── pembayaran/page.tsx   # Payment page
│   └── cek-transaksi/page.tsx# Transaction tracker
├── components/
│   ├── Header.tsx            # Navigation header
│   ├── Footer.tsx            # Footer
│   ├── BottomNav.tsx         # Mobile bottom nav
│   ├── HeroSlider.tsx        # Hero banner slider
│   ├── GameGrid.tsx          # Game catalog grid
│   ├── Sidebar.tsx           # Category sidebar
│   └── JxLogo.tsx            # Brand logo
└── data/
    └── games.ts              # Game data & config
```

---

## Brand Identity

| Element | Value |
|---------|-------|
| **Brand** | Juevix |
| **Tagline** | Top Up Game, Lebih Mudah |
| **Primary Color** | `#00D97E` (Neon Green) |
| **Dark Base** | `#04251a` |
| **Font Display** | Sora |
| **Font Body** | Plus Jakarta Sans |

---

## License

MIT © [Erset Digital](https://github.com/ersetdigital-sudo)
