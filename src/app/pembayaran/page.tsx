"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

function formatRupiah(n: number) {
  return "Rp" + n.toLocaleString("id-ID");
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function PembayaranPage() {
  const [activeTab, setActiveTab] = useState("qris");
  const [countdownLeft, setCountdownLeft] = useState(86400 * 1000);
  const total = 86400 * 1000;

  const tick = useCallback(() => {
    setCountdownLeft((prev) => {
      const next = prev - 1000;
      return next < 0 ? 0 : next;
    });
  }, []);

  useEffect(() => {
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, [tick]);

  const s = Math.floor(countdownLeft / 1000);
  const hours = Math.floor(s / 3600);
  const minutes = Math.floor((s % 3600) / 60);
  const seconds = s % 60;
  const pct = (countdownLeft / total) * 100;
  const danger = countdownLeft <= 3600 * 1000;

  const tabs = [
    { id: "qris", label: "QRIS" },
    { id: "va", label: "Virtual Account" },
    { id: "ew", label: "E-Wallet" },
  ];

  return (
    <main className="mx-auto max-w-[1060px] px-3 sm:px-5 py-5 pb-10">
      {/* Header minimal */}
      <header className="sticky top-0 z-40 px-3 sm:px-5 pt-3">
        <div className="mx-auto max-w-[1060px] jx-card px-4 h-[62px] flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span
              className="w-9 h-9 rounded-xl grid place-items-center"
              style={{ background: "linear-gradient(135deg,#04251a,#0a5238)" }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M12 2 4 9l8 13 8-13-8-7Z" fill="#00D97E" />
                <path d="M12 2 4 9h16l-8-7Z" fill="#8bffd2" />
              </svg>
            </span>
            <span className="font-display font-extrabold text-[17px]">Juevix</span>
          </Link>
          <span className="w-px h-6 bg-[var(--jx-line)] hidden sm:block" />
          <span className="font-display font-extrabold text-[14px] sm:text-[16px]">Selesaikan Pembayaran</span>
          <span className="ml-auto flex items-center gap-2 text-[12px] font-bold text-[var(--jx-muted)]">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 3 5 6v6c0 4 3 7 7 9 4-2 7-5 7-9V6l-7-3Z" />
            </svg>
            <span className="hidden sm:inline">Transaksi Aman</span>
          </span>
        </div>
      </header>

      {/* Stepper */}
      <ol className="jx-panel p-4 sm:p-5 grid grid-cols-3 relative mb-4">
        <li className="relative text-center">
          <div className="absolute top-[14px] left-1/2 w-full h-[3px] bg-[var(--jx-neon)]" />
          <span className="relative z-10 w-8 h-8 mx-auto rounded-full grid place-items-center bg-[var(--jx-neon)] text-[#04251a]">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </span>
          <p className="font-bold text-[11px] sm:text-[13px] mt-2">Pilih Produk</p>
        </li>
        <li className="relative text-center">
          <div className="absolute top-[14px] left-1/2 w-full h-[3px] bg-[var(--jx-line)]" />
          <span
            className="relative z-10 w-8 h-8 mx-auto rounded-full grid place-items-center bg-[var(--jx-neon)] text-[#04251a] font-extrabold text-[13px]"
            style={{ boxShadow: "0 0 0 5px rgba(0,217,126,.18)" }}
          >
            2
          </span>
          <p className="font-bold text-[11px] sm:text-[13px] mt-2 text-[var(--jx-neon-600)]">Pembayaran</p>
        </li>
        <li className="relative text-center">
          <span className="relative z-10 w-8 h-8 mx-auto rounded-full grid place-items-center bg-[#eef3f1] text-[var(--jx-muted)] font-extrabold text-[13px]">
            3
          </span>
          <p className="font-bold text-[11px] sm:text-[13px] mt-2 text-[var(--jx-muted)]">Selesai</p>
        </li>
      </ol>

      {/* Countdown */}
      <div className="jx-panel p-4 sm:p-5 mb-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-[#fff4e0] text-[#b45309] grid place-items-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
              </svg>
            </span>
            <div>
              <p className="font-bold text-[13px]">Selesaikan pembayaran sebelum</p>
              <p className="text-[12px] text-[var(--jx-muted)]">14 September 2026, 20:41 WIB</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[11px] font-bold text-[var(--jx-muted)]">SISA WAKTU</p>
            <p
              className={`font-display text-[26px] sm:text-[30px] font-extrabold tabular-nums leading-none ${
                danger ? "text-red-600" : "text-amber-600"
              }`}
            >
              {pad(hours)}:{pad(minutes)}:{pad(seconds)}
            </p>
          </div>
        </div>
        <div className="h-1.5 rounded-full bg-[#eef3f1] mt-4 overflow-hidden">
          <div
            className={`h-full rounded-full ${danger ? "bg-red-500" : "bg-amber-500"}`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_330px] gap-4 items-start">
        {/* Instruksi */}
        <div className="jx-panel p-5 min-w-0">
          <h2 className="font-display font-extrabold text-[16px]">Instruksi Pembayaran</h2>
          <p className="text-[12px] text-[var(--jx-muted)] mt-1">
            Pilih channel yang kamu gunakan lalu ikuti langkahnya.
          </p>

          <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`jx-tab ${activeTab === tab.id ? "is-active" : ""}`}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  minHeight: 44,
                  padding: "0 0.95rem",
                  borderRadius: 12,
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  border: "1.5px solid var(--jx-line)",
                  background: activeTab === tab.id ? "var(--jx-neon-soft)" : "#fff",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "all .15s ease",
                  borderColor: activeTab === tab.id ? "var(--jx-neon)" : undefined,
                  color: activeTab === tab.id ? "#0a5238" : undefined,
                }}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* QRIS */}
          {activeTab === "qris" && (
            <div className="mt-5">
              <div className="rounded-2xl border border-[var(--jx-line)] p-5 text-center">
                <p className="text-[12px] font-bold text-[var(--jx-muted)]">
                  Scan QR di bawah dengan aplikasi apa pun yang mendukung QRIS
                </p>
                <div
                  className="mx-auto mt-4 border-8 border-white"
                  style={{
                    width: 196,
                    height: 196,
                    borderRadius: 14,
                    background: "repeating-conic-gradient(#12241d 0% 25%, #ffffff 0% 50%) 0 0/16px 16px",
                    boxShadow: "0 0 0 1px var(--jx-line)",
                  }}
                />
                <p className="font-display font-extrabold text-[19px] mt-4">Rp133.000</p>
                <p className="text-[12px] text-[var(--jx-muted)]">a.n. JUEVIX DIGITAL INDONESIA</p>
                <div className="flex flex-wrap gap-2 justify-center mt-4">
                  <a href="#" download className="jx-btn jx-btn-primary">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M12 3v12M7 11l5 5 5-5M4 21h16" />
                    </svg>
                    Download QR
                  </a>
                  <button
                    className="jx-btn jx-btn-ghost"
                    onClick={() => navigator.clipboard?.writeText("Rp133.000")}
                  >
                    Salin Nominal
                  </button>
                </div>
              </div>
              <ol className="mt-5 space-y-2.5 text-[13px] text-[var(--jx-muted)] leading-relaxed list-decimal pl-5">
                <li>Buka aplikasi e-wallet atau m-banking kamu.</li>
                <li>
                  Pilih menu <b className="text-[var(--jx-ink)]">Scan / QRIS</b>, lalu arahkan ke QR di atas (atau upload hasil download).
                </li>
                <li>
                  Pastikan nama merchant <b className="text-[var(--jx-ink)]">JUEVIX DIGITAL INDONESIA</b> dan nominal{" "}
                  <b className="text-[var(--jx-ink)]">Rp133.000</b>.
                </li>
                <li>Konfirmasi pembayaran. Status pesanan otomatis berubah dalam beberapa detik.</li>
              </ol>
            </div>
          )}

          {/* VA */}
          {activeTab === "va" && (
            <div className="mt-5">
              <div className="rounded-2xl border border-[var(--jx-line)] p-5">
                <div className="flex items-center gap-3">
                  <span
                    className="w-11 h-11 rounded-xl grid place-items-center text-[11px] font-extrabold text-white"
                    style={{ background: "#0060af" }}
                  >
                    BCA
                  </span>
                  <div>
                    <p className="font-bold text-[13px]">BCA Virtual Account</p>
                    <p className="text-[12px] text-[var(--jx-muted)]">a.n. JUEVIX DIGITAL INDONESIA</p>
                  </div>
                </div>
                <p className="text-[12px] font-bold text-[var(--jx-muted)] mt-4">Nomor Virtual Account</p>
                <div className="flex flex-wrap items-center gap-3 mt-1">
                  <p className="font-display font-extrabold text-[22px] sm:text-[26px] tracking-wide tabular-nums break-all">
                    8277 0812 3456 7890
                  </p>
                  <button
                    className="jx-btn jx-btn-soft"
                    onClick={() => navigator.clipboard?.writeText("8277081234567890")}
                  >
                    Salin
                  </button>
                </div>
                <div className="flex justify-between items-end mt-4 pt-4 border-t border-[var(--jx-line)]">
                  <span className="text-[13px] font-bold">Total Bayar</span>
                  <span className="font-display font-extrabold text-[19px] text-[var(--jx-neon-600)]">Rp133.000</span>
                </div>
              </div>

              <div className="mt-4">
                <details className="jx-acc" open>
                  <summary>
                    Cara bayar via ATM BCA
                    <svg className="jx-chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </summary>
                  <div>
                    <ol className="list-decimal pl-4 space-y-1.5">
                      <li>Masukkan kartu dan PIN ATM.</li>
                      <li>Pilih <b>Transaksi Lainnya → Transfer → ke Rek BCA Virtual Account</b>.</li>
                      <li>Masukkan nomor VA <b>8277081234567890</b>.</li>
                      <li>Cek nama dan nominal, lalu konfirmasi.</li>
                    </ol>
                  </div>
                </details>
                <details className="jx-acc">
                  <summary>
                    Cara bayar via m-BCA (mobile banking)
                    <svg className="jx-chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </summary>
                  <div>
                    <ol className="list-decimal pl-4 space-y-1.5">
                      <li>Buka aplikasi BCA mobile → <b>m-BCA</b>.</li>
                      <li>Pilih <b>m-Transfer → BCA Virtual Account</b>.</li>
                      <li>Masukkan nomor VA, lalu klik Send.</li>
                      <li>Konfirmasi dengan PIN m-BCA.</li>
                    </ol>
                  </div>
                </details>
                <details className="jx-acc">
                  <summary>
                    Cara bayar via Internet Banking (KlikBCA)
                    <svg className="jx-chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </summary>
                  <div>
                    <ol className="list-decimal pl-4 space-y-1.5">
                      <li>Login ke KlikBCA Individual.</li>
                      <li>Pilih <b>Transfer Dana → Transfer ke BCA Virtual Account</b>.</li>
                      <li>Masukkan nomor VA dan lanjutkan.</li>
                      <li>Konfirmasi dengan KeyBCA.</li>
                    </ol>
                  </div>
                </details>
              </div>
            </div>
          )}

          {/* E-Wallet */}
          {activeTab === "ew" && (
            <div className="mt-5">
              <div className="rounded-2xl border border-[var(--jx-line)] p-5 text-center">
                <span
                  className="w-14 h-14 mx-auto rounded-2xl grid place-items-center text-[12px] font-extrabold text-white"
                  style={{ background: "#118eea" }}
                >
                  DANA
                </span>
                <p className="font-bold text-[14px] mt-3">Bayar dengan DANA</p>
                <p className="text-[12px] text-[var(--jx-muted)] mt-1 max-w-sm mx-auto leading-relaxed">
                  Kamu akan diarahkan ke aplikasi DANA untuk mengonfirmasi pembayaran sebesar{" "}
                  <b className="text-[var(--jx-ink)]">Rp133.000</b>.
                </p>
                <a href="#" className="jx-btn jx-btn-primary mt-4">
                  Buka Aplikasi DANA
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M7 17 17 7M9 7h8v8" />
                  </svg>
                </a>
              </div>
              <ol className="mt-5 space-y-2.5 text-[13px] text-[var(--jx-muted)] leading-relaxed list-decimal pl-5">
                <li>
                  Klik tombol <b className="text-[var(--jx-ink)]">Buka Aplikasi DANA</b> di atas.
                </li>
                <li>Login ke akun DANA kamu bila diminta.</li>
                <li>Cek detail merchant dan nominal pembayaran.</li>
                <li>Konfirmasi dengan PIN DANA. Selesai — pesanan diproses otomatis.</li>
              </ol>
            </div>
          )}
        </div>

        {/* Ringkasan */}
        <aside className="min-w-0">
          <div className="jx-panel p-5 lg:sticky jx-sticky" style={{ top: 84 }}>
            <h2 className="font-display font-extrabold text-[15px] mb-4">Ringkasan Pesanan</h2>
            <div className="flex items-center gap-3 pb-4 border-b border-[var(--jx-line)]">
              <Image
                src="/9ddb81da-7b77-4659-8019-49f3ed9f7ef2.png"
                alt="Mobile Legends"
                width={48}
                height={48}
                className="w-12 h-12 rounded-xl object-cover"
              />
              <div className="min-w-0">
                <p className="font-bold text-[13px] truncate">Mobile Legends</p>
                <p className="text-[11px] text-[var(--jx-muted)]">Moonton • MOBA</p>
              </div>
            </div>
            <dl className="text-[13px] py-4 space-y-2.5 border-b border-[var(--jx-line)]">
              <div className="flex justify-between gap-3">
                <dt className="text-[var(--jx-muted)]">User ID</dt>
                <dd className="font-bold">12345678</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-[var(--jx-muted)]">Server ID</dt>
                <dd className="font-bold">2145</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-[var(--jx-muted)]">Produk</dt>
                <dd className="font-bold text-right">500 Diamond</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-[var(--jx-muted)]">Pembayaran</dt>
                <dd className="font-bold text-right">QRIS</dd>
              </div>
            </dl>
            <dl className="text-[13px] py-4 space-y-2.5 border-b border-[var(--jx-line)]">
              <div className="flex justify-between">
                <dt className="text-[var(--jx-muted)]">Subtotal</dt>
                <dd className="font-bold">Rp132.000</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-[var(--jx-muted)]">Biaya admin</dt>
                <dd className="font-bold">Rp1.000</dd>
              </div>
            </dl>
            <div className="flex items-end justify-between pt-4">
              <span className="text-[13px] font-bold">Total Bayar</span>
              <span className="font-display text-[23px] font-extrabold text-[var(--jx-neon-600)]">Rp133.000</span>
            </div>
            <div className="mt-4 rounded-xl bg-[#f6f9f8] p-3 flex items-center justify-between gap-2">
              <div className="min-w-0">
                <p className="text-[11px] text-[var(--jx-muted)] font-semibold">Nomor Invoice</p>
                <p className="font-bold text-[13px] truncate">JVX-20260913-8842</p>
              </div>
              <button
                className="jx-btn jx-btn-ghost text-[12px]"
                style={{ minHeight: 36 }}
                onClick={() => navigator.clipboard?.writeText("JVX-20260913-8842")}
              >
                Salin
              </button>
            </div>
            <Link href="/cek-transaksi" className="jx-btn jx-btn-primary w-full mt-4" style={{ minHeight: 50 }}>
              Cek Status Pembayaran
            </Link>
            <button className="jx-btn jx-btn-ghost w-full mt-2 text-red-600 border-red-100 hover:border-red-300 hover:bg-red-50 hover:text-red-700">
              Batalkan Pesanan
            </button>
          </div>
        </aside>
      </div>

      {/* Bantuan */}
      <section className="jx-panel mt-4 p-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-xl bg-[var(--jx-neon-soft)] text-[var(--jx-neon-600)] grid place-items-center">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 12a9 9 0 1 1-3.5-7.1L21 4v6h-6" />
            </svg>
          </span>
          <div>
            <p className="font-bold text-[14px]">Butuh bantuan?</p>
            <p className="text-[12px] text-[var(--jx-muted)]">Tim CS Juevix siap bantu 24 jam lewat WhatsApp.</p>
          </div>
        </div>
        <a href="https://wa.me/6281234567890" className="jx-btn jx-btn-primary">
          Hubungi CS via WhatsApp
        </a>
      </section>
    </main>
  );
}
