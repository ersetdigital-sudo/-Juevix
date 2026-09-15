"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface Stats {
  games: number;
  categories: number;
  nominals: number;
  payments: number;
  slides: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin")
      .then((r) => r.json())
      .then((d) => setStats(d.stats))
      .finally(() => setLoading(false));
  }, []);

  const cards = [
    { label: "Games", value: stats?.games, href: "/admin/games", color: "#00D97E" },
    { label: "Nominals", value: stats?.nominals, href: "/admin/nominals", color: "#3b82f6" },
    { label: "Payments", value: stats?.payments, href: "/admin/payments", color: "#8b5cf6" },
    { label: "Slides", value: stats?.slides, href: "/admin/slides", color: "#f59e0b" },
    { label: "Categories", value: stats?.categories, href: "/admin/games", color: "#ef4444" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl font-extrabold">Dashboard</h2>
        <p className="text-[14px] text-gray-500 mt-1">Kelola semua data Juevix dari sini.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {cards.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-lg hover:-translate-y-0.5 transition-all group"
          >
            <div
              className="w-10 h-10 rounded-xl grid place-items-center mb-3"
              style={{ background: `${c.color}15` }}
            >
              <div className="w-3 h-3 rounded-full" style={{ background: c.color }} />
            </div>
            <p className="text-[28px] font-display font-extrabold leading-none">
              {loading ? "—" : c.value}
            </p>
            <p className="text-[13px] text-gray-500 mt-1 font-semibold">{c.label}</p>
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6">
        <h3 className="font-display font-extrabold text-[16px] mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <Link href="/admin/games" className="jx-btn jx-btn-primary text-[13px]">
            Kelola Games
          </Link>
          <Link href="/admin/nominals" className="jx-btn jx-btn-dark text-[13px]">
            Kelola Harga
          </Link>
          <Link href="/admin/payments" className="jx-btn jx-btn-ghost text-[13px] border-gray-200">
            Kelola Pembayaran
          </Link>
          <Link href="/admin/settings" className="jx-btn jx-btn-ghost text-[13px] border-gray-200">
            Pengaturan Site
          </Link>
        </div>
      </div>
    </div>
  );
}
