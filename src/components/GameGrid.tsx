"use client";

import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import type { Game, Category } from "@/lib/db";

function GameGridInner({
  games,
  categories,
}: {
  games: Game[];
  categories: Category[];
}) {
  const searchParams = useSearchParams();
  const activeSlug = searchParams.get("category") || "semua";

  const filtered =
    activeSlug === "semua"
      ? games
      : games.filter((g) => {
          const cat = categories.find((c) => c.slug === activeSlug);
          return cat && g.category === cat.name;
        });

  const meta = categories.find((c) => c.slug === activeSlug)
    ? { label: categories.find((c) => c.slug === activeSlug)!.name, desc: "" }
    : { label: "Semua Game", desc: "Semua game yang tersedia." };

  return (
    <section className="mt-6">
      <div className="flex items-end justify-between mb-3">
        <div className="flex items-start gap-2">
          <span className="text-[var(--jx-neon-600)] mt-1">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="7" width="20" height="11" rx="4" />
              <path d="M7 12h3M8.5 10.5v3M16.5 12h.01M18.5 14h.01" />
            </svg>
          </span>
          <div>
            <h2 className="font-display text-lg sm:text-xl font-extrabold leading-tight">
              {meta.label}
            </h2>
            {meta.desc && (
              <p className="text-[12px] text-[var(--jx-muted)]">
                {meta.desc}
              </p>
            )}
          </div>
        </div>
        {filtered.length > 0 && (
          <Link
            href={`/game/${filtered[0].slug}`}
            className="text-[12px] font-bold text-[var(--jx-neon-600)] whitespace-nowrap"
          >
            Lihat Semua ›
          </Link>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="jx-card p-10 text-center">
          <div className="w-16 h-16 mx-auto rounded-2xl grid place-items-center mb-4" style={{ background: "linear-gradient(135deg,#eafaf2,#d4f5e4)" }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00D97E" strokeWidth="2">
              <rect x="2" y="7" width="20" height="11" rx="4" />
              <path d="M7 12h3M8.5 10.5v3M16.5 12h.01M18.5 14h.01" />
            </svg>
          </div>
          <p className="font-display font-extrabold text-[16px] mb-1">
            Segera Hadir
          </p>
          <p className="text-[13px] text-[var(--jx-muted)]">
            Game {meta.label} akan segera tersedia. Nantikan ya!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
          {filtered.map((game) => (
            <Link
              key={game.slug}
              href={`/game/${game.slug}`}
              className="jx-card p-2.5 block hover:-translate-y-1 transition-transform"
            >
              <div
                className="rounded-[14px] h-[110px] sm:h-[120px] overflow-hidden"
                style={game.gradient ? { background: game.gradient } : undefined}
              >
                {game.image ? (
                  <Image
                    src={game.image}
                    alt={game.name}
                    width={300}
                    height={120}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full grid place-items-center text-center">
                    <span className="font-display text-white font-extrabold text-[13px] leading-tight whitespace-pre-line">
                      {game.label}
                    </span>
                  </div>
                )}
              </div>
              <h3 className="font-bold text-[13px] mt-2.5">{game.name}</h3>
              <p className="text-[11px] font-semibold mt-0.5">
                <span className="jx-stars">★★★★★</span>{" "}
                <span className="text-[var(--jx-muted)]">
                  {game.rating} ({game.reviews})
                </span>
              </p>
              <span className="jx-btn jx-btn-soft w-full mt-2.5 text-[12px]" style={{ minHeight: 36 }}>
                Top Up Game ›
              </span>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}

export function GameGrid({
  games,
  categories,
}: {
  games: Game[];
  categories: Category[];
}) {
  return (
    <Suspense fallback={<div className="mt-6 text-center text-[13px] text-[var(--jx-muted)]">Memuat game...</div>}>
      <GameGridInner games={games} categories={categories} />
    </Suspense>
  );
}
