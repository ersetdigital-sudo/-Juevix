"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function BottomNav() {
  const pathname = usePathname();

  const items = [
    {
      href: "/",
      label: "Home",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="m3 11 9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />
        </svg>
      ),
    },
    {
      href: "/game/mobile-legends",
      label: "Topup",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="7" width="20" height="11" rx="4" />
          <path d="M7 12h3M8.5 10.5v3M16.5 12h.01M18.5 14h.01" />
        </svg>
      ),
    },
    {
      href: "/cek-transaksi",
      label: "Transaksi",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 2h9l5 5v15H6z" />
          <path d="M9 13h6M9 17h4" />
        </svg>
      ),
    },
    {
      href: "#",
      label: "Akun",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 21a8 8 0 0 1 16 0" />
        </svg>
      ),
    },
  ];

  return (
    <nav className="jx-bottomnav lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white border-t border-[var(--jx-line)] grid grid-cols-4 text-[11px] font-semibold">
      {items.map((item) => {
        const active = pathname === item.href;
        return (
          <Link
            key={item.label}
            href={item.href}
            className={`flex flex-col items-center justify-center gap-1 ${
              active ? "text-[var(--jx-neon-600)]" : "text-slate-500"
            }`}
          >
            {item.icon}
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
