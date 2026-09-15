<div align="center">

<img src="public/favicon.svg" alt="Juevix Logo" width="60">

# Juevix

### Top Up Game, Lebih Mudah

**Platform top up diamond, gems, dan voucher game favorit kamu.  
Proses instan 24 jam, harga termurah, transaksi aman.**

<br>

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

<br>

[![License](https://img.shields.io/badge/License-MIT-00D97E?style=for-the-badge)](#)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen?style=for-the-badge)](#)
[![Issues](https://img.shields.io/badge/Issues-0-blue?style=for-the-badge)](#)

</div>

---

## Preview

<div align="center">

<img src="public/9ddb81da-7b77-4659-8019-49f3ed9f7ef2.png" alt="Juevix Preview" width="100%">

</div>

---

## Fitur Utama

<table>
  <tr>
    <td align="center" width="90">
      <img src="https://img.shields.io/badge/-Game_Catalog-00D97E?style=flat-square&logo=gamepad&logoColor=white" height="28" alt="Game Catalog">
    </td>
    <td>
      <b>Game Catalog</b><br>
      Katalog game lengkap dengan filter kategori & platform
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="https://img.shields.io/badge/-Instant_Top_Up-FFC107?style=flat-square&logo=bolt&logoColor=black" height="28" alt="Instant Top Up">
    </td>
    <td>
      <b>Instant Top Up</b><br>
      Proses top up otomatis dalam hitungan detik
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="https://img.shields.io/badge/-Multi_Payment-2196F3?style=flat-square&logo=credit-card&logoColor=white" height="28" alt="Multi Payment">
    </td>
    <td>
      <b>Multi Pembayaran</b><br>
      QRIS, e-wallet (DANA, OVO, GoPay, ShopeePay), VA, minimarket
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="https://img.shields.io/badge/-Cek_Nickname-9C27B0?style=flat-square&logo=search&logoColor=white" height="28" alt="Cek Nickname">
    </td>
    <td>
      <b>Cek Nickname</b><br>
      Verifikasi ID game sebelum bayar
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="https://img.shields.io/badge/-Cek_Transaksi-FF5722?style=flat-square&logo=chart-line&logoColor=white" height="28" alt="Cek Transaksi">
    </td>
    <td>
      <b>Cek Transaksi</b><br>
      Lacak status pesanan real-time dengan invoice
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="https://img.shields.io/badge/-Responsive-4CAF50?style=flat-square&logo=mobile-alt&logoColor=white" height="28" alt="Responsive">
    </td>
    <td>
      <b>Responsive</b><br>
      Mobile-first design, sempurna di semua device
    </td>
  </tr>
  <tr>
    <td align="center">
      <img src="https://img.shields.io/badge/-Dark_Theme-212121?style=flat-square&logo=moon&logoColor=white" height="28" alt="Dark Theme">
    </td>
    <td>
      <b>Dark Theme</b><br>
      UI gelap premium dengan aksen neon hijau
    </td>
  </tr>
</table>

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

<div align="center">

| | Tech | Versi |
|---|------|-------|
| <img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=next.js&logoColor=white" height="22"> | **Framework** | 16 (App Router + Turbopack) |
| <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black" height="22"> | **UI Library** | 19 |
| <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" height="22"> | **Styling** | 4 |
| <img src="https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer&logoColor=white" height="22"> | **Animation** | 13 |
| <img src="https://img.shields.io/badge/Swiper-6332F6?style=flat-square&logo=swiper&logoColor=white" height="22"> | **Slider** | 14 |
| <img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" height="22"> | **Language** | 5 |
| <img src="https://img.shields.io/badge/Font-Sora-FF6B6B?style=flat-square&logo=googlefonts&logoColor=white" height="22"> | **Display Font** | Sora |
| <img src="https://img.shields.io/badge/Font-Plus_Jakarta-00D97E?style=flat-square&logo=googlefonts&logoColor=white" height="22"> | **Body Font** | Plus Jakarta Sans |

</div>

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

<table>
  <tr>
    <td><b>Brand</b></td>
    <td>Juevix</td>
  </tr>
  <tr>
    <td><b>Tagline</b></td>
    <td>Top Up Game, Lebih Mudah</td>
  </tr>
  <tr>
    <td><b>Primary Color</b></td>
    <td><code>#00D97E</code> (Neon Green)</td>
  </tr>
  <tr>
    <td><b>Dark Base</b></td>
    <td><code>#04251a</code></td>
  </tr>
  <tr>
    <td><b>Font Display</b></td>
    <td>Sora</td>
  </tr>
  <tr>
    <td><b>Font Body</b></td>
    <td>Plus Jakarta Sans</td>
  </tr>
</table>

---

## License

MIT © [Erset Digital](https://github.com/ersetdigital-sudo)
