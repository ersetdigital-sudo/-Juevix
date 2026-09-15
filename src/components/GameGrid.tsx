import Link from "next/link";
import Image from "next/image";
import { games } from "@/data/games";

export function GameGrid() {
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
              Moba Game
            </h2>
            <p className="text-[12px] text-[var(--jx-muted)]">
              Game MOBA populer dengan jutaan pemain di seluruh dunia.
            </p>
          </div>
        </div>
        <Link
          href="/game/mobile-legends"
          className="text-[12px] font-bold text-[var(--jx-neon-600)] whitespace-nowrap"
        >
          Lihat Semua ›
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
        {games.map((game) => (
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
    </section>
  );
}
