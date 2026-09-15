"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { JxLogo } from "./JxLogo";

export function Header() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/game/mobile-legends", label: "Topup Game" },
    { href: "/cek-transaksi", label: "Cek Transaksi" },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <>
      <header className="sticky top-0 z-40 px-3 sm:px-5 pt-3">
        <div className="mx-auto max-w-[1200px] jx-card px-3 sm:px-4 h-[62px] flex items-center gap-3 sm:gap-4">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <JxLogo />
            <span className="leading-tight">
              <span className="block font-display font-extrabold text-[17px]">
                Juevix
              </span>
              <span className="hidden sm:block text-[10px] text-[var(--jx-muted)] font-semibold">
                Top Up Game, Lebih Mudah
              </span>
            </span>
          </Link>

          <div className="hidden md:flex flex-1 max-w-[300px] relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            <input
              className="jx-input pl-9 pr-14 bg-[#f6f9f8]"
              style={{ minHeight: 40 }}
              placeholder="Cari game favorit kamu..."
            />
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-bold text-[var(--jx-muted)] bg-white border border-[var(--jx-line)] rounded-md px-1.5 py-1">
              Ctrl K
            </span>
          </div>

          <nav className="hidden lg:flex items-center gap-5 ml-auto">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`jx-navlink ${isActive(link.href) ? "is-active" : ""}`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/"
              className="jx-navlink"
            >
              Semua Game
            </Link>
          </nav>

          <div className="hidden lg:flex items-center gap-2 ml-2">
            <Link
              href="/cek-transaksi"
              className="jx-btn jx-btn-ghost text-[13px]"
              style={{ minHeight: 40 }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M6 2h9l5 5v15H6z" />
                <path d="M9 13h6M9 17h4" />
              </svg>
              Cek Transaksi
            </Link>
          </div>

          <button
            onClick={() => setDrawerOpen(true)}
            className="lg:hidden ml-auto w-10 h-10 grid place-items-center rounded-xl border border-[var(--jx-line)]"
            aria-label="Menu"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-[86%] max-w-xs bg-white p-5 overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <span className="font-display font-extrabold text-lg">Menu</span>
              <button
                onClick={() => setDrawerOpen(false)}
                className="w-11 h-11 grid place-items-center rounded-xl border border-[var(--jx-line)]"
                aria-label="Tutup"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="m6 6 12 12M18 6 6 18" />
                </svg>
              </button>
            </div>
            <input
              className="jx-input mb-4"
              placeholder="Cari game favorit kamu..."
            />
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setDrawerOpen(false)}
                className={`jx-side ${isActive(link.href) ? "is-active" : ""}`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/"
              onClick={() => setDrawerOpen(false)}
              className="jx-side"
            >
              Semua Game
            </Link>
            <Link
              href="/cek-transaksi"
              onClick={() => setDrawerOpen(false)}
              className="jx-side mt-2"
            >
              Cek Transaksi
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
