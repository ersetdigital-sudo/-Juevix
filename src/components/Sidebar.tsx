"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import type { Category } from "@/lib/db";
import { useSettings } from "@/components/SettingsContext";

function CategoryIcon({ icon }: { icon: string }) {
  const icons: Record<string, React.ReactNode> = {
    home: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="m3 11 9-8 9 8v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" />
      </svg>
    ),
    gamepad: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="7" width="20" height="11" rx="4" />
        <path d="M7 12h3M8.5 10.5v3M16.5 12h.01M18.5 14h.01" />
      </svg>
    ),
    sword: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="m14 3 7 7-9 9-7-7 9-9Z" />
        <path d="M5 19h.01" />
      </svg>
    ),
    smile: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="9" />
        <path d="M9 10h.01M15 10h.01M9 15h6" />
      </svg>
    ),
    building: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M4 20h16M6 20V9l6-5 6 5v11" />
      </svg>
    ),
    clock: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </svg>
    ),
    globe: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 3v18M3 12h18" />
      </svg>
    ),
    layers: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="m9 4 6 2 6-2v14l-6 2-6-2-6 2V6l6-2Z" />
        <path d="M9 4v14M15 6v14" />
      </svg>
    ),
    grid: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
    phone: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="7" y="2" width="10" height="20" rx="2.5" />
        <path d="M11 18h2" />
      </svg>
    ),
    monitor: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="4" width="20" height="13" rx="2" />
        <path d="M8 21h8" />
      </svg>
    ),
    console: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="8" height="18" rx="3" />
        <rect x="13" y="3" width="8" height="18" rx="3" />
      </svg>
    ),
    play: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M8 4v16l10-3V7L8 4Z" />
      </svg>
    ),
    xbox: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="9" />
        <path d="m8 8 8 8M16 8l-8 8" />
      </svg>
    ),
  };
  return icons[icon] || icons.gamepad;
}

function SidebarInner({
  categories,
}: {
  categories: Category[];
}) {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") || "semua";
  const { promo_title, promo_desc } = useSettings();

  const filteredCategories = categories.filter((c) => c.slug !== "semua");

  return (
    <aside className="hidden lg:block">
      <div className="jx-card p-3 sticky top-[80px]">
        <p className="text-[11px] font-extrabold tracking-wider text-[var(--jx-muted)] px-2 pt-1 pb-2">
          Kategori
        </p>
        <nav className="space-y-1">
          <a
            href="/"
            className={`jx-side ${activeCategory === "semua" ? "is-active" : ""}`}
          >
            <CategoryIcon icon="home" />
            Semua Game
          </a>
          {filteredCategories.map((cat) => {
            const active = activeCategory === cat.slug;
            return (
              <a
                key={cat.slug}
                href={`/?category=${cat.slug}`}
                className={`jx-side ${active ? "is-active" : ""}`}
              >
                <CategoryIcon icon={cat.icon} />
                {cat.name}
                {active && (
                  <svg
                    className="ml-auto"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="m9 6 6 6-6 6" />
                  </svg>
                )}
              </a>
            );
          })}
        </nav>

        <div
          className="mt-5 rounded-2xl p-4 text-center"
          style={{
            background: "linear-gradient(180deg,#eafaf2,#ffffff)",
            border: "1px solid #d9f2e6",
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="mx-auto">
            <path d="M12 3 4 9l8 12 8-12-8-6Z" fill="#00D97E" />
            <path d="M12 3 4 9h16l-8-6Z" fill="#8bffd2" />
          </svg>
          <p className="font-display font-extrabold text-[13px] mt-2 leading-snug">
            {promo_title || "Top Up Lebih Mudah dan Aman"}
          </p>
          <p className="text-[11px] text-[var(--jx-muted)] mt-1 leading-snug">
            {promo_desc || "Proses instan 24 jam, harga termurah."}
          </p>
        </div>
      </div>
    </aside>
  );
}

export function Sidebar({
  categories,
}: {
  categories: Category[];
}) {
  return (
    <Suspense fallback={<aside className="hidden lg:block"><div className="jx-card p-3 w-[240px] h-[400px] animate-pulse" /></aside>}>
      <SidebarInner categories={categories} />
    </Suspense>
  );
}
