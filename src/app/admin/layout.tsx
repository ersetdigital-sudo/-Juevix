"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const nav = [
  {
    label: "Overview",
    href: "/admin",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
  {
    label: "Categories",
    href: "/admin/categories",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2 4 9l8 13 8-13-8-6Z" />
      </svg>
    ),
  },
  {
    label: "Games",
    href: "/admin/games",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="7" width="20" height="11" rx="4" />
        <path d="M7 12h3M8.5 10.5v3M16.5 12h.01M18.5 14h.01" />
      </svg>
    ),
  },
  {
    label: "Nominals",
    href: "/admin/nominals",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 3 4 9l8 12 8-12-8-6Z" />
      </svg>
    ),
  },
  {
    label: "Payments",
    href: "/admin/payments",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="5" width="20" height="14" rx="3" />
        <path d="M2 10h20" />
      </svg>
    ),
  },
  {
    label: "Slides",
    href: "/admin/slides",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
      </svg>
    ),
  },
  {
    label: "Orders",
    href: "/admin/orders",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M6 2h9l5 5v15H6z" />
        <path d="M9 13h6M9 17h4" />
        <path d="M9 3v4M14 3v4" />
      </svg>
    ),
  },
];

import { ToastProvider } from "@/components/admin/Toast";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <ToastProvider>
    <div className="min-h-screen bg-[#f0f4f3] flex">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-[260px] bg-[#04251a] text-white flex flex-col transition-transform duration-300 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="px-5 h-[64px] flex items-center gap-3 border-b border-white/10">
          <span
            className="w-9 h-9 rounded-xl grid place-items-center shrink-0"
            style={{ background: "linear-gradient(135deg,#0a5238,#00D97E)" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 2 4 9l8 13 8-13-8-7Z" fill="#fff" />
            </svg>
          </span>
          <div>
            <span className="font-display font-extrabold text-[16px]">Juevix</span>
            <span className="block text-[10px] text-white/50 font-semibold">Admin Panel</span>
          </div>
          <button onClick={() => setOpen(false)} className="lg:hidden ml-auto w-8 h-8 grid place-items-center rounded-lg hover:bg-white/10">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="m6 6 12 12M18 6 6 18" />
            </svg>
          </button>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-semibold transition-all ${
                  active
                    ? "bg-[#00D97E] text-[#04251a]"
                    : "text-white/70 hover:bg-white/10 hover:text-white"
                }`}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-white/10 space-y-1">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-semibold text-white/70 hover:bg-white/10 hover:text-white transition-all"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
            Lihat Site
          </Link>
          <button
            onClick={async () => {
              await fetch("/api/admin/auth/logout", { method: "POST" });
              window.location.href = "/admin-login";
            }}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-semibold text-white/70 hover:bg-red-500/20 hover:text-red-400 transition-all w-full"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Logout
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Main */}
      <div className="flex-1 lg:ml-[260px]">
        {/* Top bar */}
        <header className="sticky top-0 z-30 h-[64px] bg-white/80 backdrop-blur-xl border-b border-[#e2e8f0] px-5 flex items-center gap-4">
          <button
            onClick={() => setOpen(true)}
            className="lg:hidden w-10 h-10 grid place-items-center rounded-xl border border-[#e2e8f0] hover:bg-gray-50"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
          <h1 className="font-display font-extrabold text-[17px]">
            {nav.find((n) => n.href === pathname)?.label || "Admin"}
          </h1>
          <div className="ml-auto flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-[#00D97E] grid place-items-center text-[#04251a] font-extrabold text-[12px]">
              A
            </span>
          </div>
        </header>

        <main className="p-5">{children}</main>
      </div>
    </div>
    </ToastProvider>
  );
}
