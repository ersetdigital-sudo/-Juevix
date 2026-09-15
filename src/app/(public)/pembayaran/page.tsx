"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";

interface PaymentMethod {
  id: number;
  category: string;
  type: string;
  name: string;
  label: string;
  code: string;
  color: string;
  account_number: string | null;
  account_name: string | null;
  qris_image: string | null;
  icon: string | null;
}

function formatRupiah(n: number) {
  return "Rp" + n.toLocaleString("id-ID");
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function PembayaranPage() {
  const [payments, setPayments] = useState<PaymentMethod[]>([]);
  const [activeTab, setActiveTab] = useState("");
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

  useEffect(() => {
    fetch("/api/payments")
      .then((r) => r.json())
      .then((data: PaymentMethod[]) => {
        setPayments(data);
        if (data.length > 0) {
          const qris = data.find((p) => p.type === "qris");
          setActiveTab(qris ? String(qris.id) : String(data[0].id));
        }
      });
  }, []);

  const s = Math.floor(countdownLeft / 1000);
  const hours = Math.floor(s / 3600);
  const minutes = Math.floor((s % 3600) / 60);
  const seconds = s % 60;
  const pct = (countdownLeft / total) * 100;
  const danger = countdownLeft <= 3600 * 1000;

  const categories = payments.reduce<Record<string, PaymentMethod[]>>((acc, p) => {
    const key = p.category;
    if (!acc[key]) acc[key] = [];
    acc[key].push(p);
    return acc;
  }, {});

  const catTabs = Object.entries(categories).map(([key, methods]) => ({
    key,
    label: key === "qris" ? "QRIS" : key === "va" ? "Virtual Account" : key === "ewallet" ? "E-Wallet" : key === "minimarket" ? "Minimarket" : key,
    methods,
  }));

  const selectedPayment = payments.find((p) => String(p.id) === activeTab);

  return (
    <main className="mx-auto max-w-[1060px] px-3 sm:px-5 py-5 pb-10">
      <header className="sticky top-0 z-40 px-3 sm:px-5 pt-3">
        <div className="mx-auto max-w-[1060px] jx-card px-4 h-[62px] flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="w-9 h-9 rounded-xl grid place-items-center" style={{ background: "linear-gradient(135deg,#04251a,#0a5238)" }}>
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
          <span className="relative z-10 w-8 h-8 mx-auto rounded-full grid place-items-center bg-[var(--jx-neon)] text-[#04251a] font-extrabold text-[13px]" style={{ boxShadow: "0 0 0 5px rgba(0,217,126,.18)" }}>2</span>
          <p className="font-bold text-[11px] sm:text-[13px] mt-2 text-[var(--jx-neon-600)]">Pembayaran</p>
        </li>
        <li className="relative text-center">
          <span className="relative z-10 w-8 h-8 mx-auto rounded-full grid place-items-center bg-[#eef3f1] text-[var(--jx-muted)] font-extrabold text-[13px]">3</span>
          <p className="font-bold text-[11px] sm:text-[13px] mt-2 text-[var(--jx-muted)]">Selesai</p>
        </li>
      </ol>

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
            <p className={`font-display text-[26px] sm:text-[30px] font-extrabold tabular-nums leading-none ${danger ? "text-red-600" : "text-amber-600"}`}>
              {pad(hours)}:{pad(minutes)}:{pad(seconds)}
            </p>
          </div>
        </div>
        <div className="h-1.5 rounded-full bg-[#eef3f1] mt-4 overflow-hidden">
          <div className={`h-full rounded-full ${danger ? "bg-red-500" : "bg-amber-500"}`} style={{ width: `${pct}%` }} />
        </div>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_330px] gap-4 items-start">
        <div className="jx-panel p-5 min-w-0">
          <h2 className="font-display font-extrabold text-[16px]">Instruksi Pembayaran</h2>
          <p className="text-[12px] text-[var(--jx-muted)] mt-1">Pilih metode pembayaran yang kamu inginkan.</p>

          <div className="flex gap-2 mt-4 overflow-x-auto pb-1 flex-wrap">
            {catTabs.map((tab) => (
              <button
                key={tab.key}
                className="jx-tab"
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
                  background: tab.methods.some((m) => String(m.id) === activeTab) ? "var(--jx-neon-soft)" : "#fff",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "all .15s ease",
                  borderColor: tab.methods.some((m) => String(m.id) === activeTab) ? "var(--jx-neon)" : undefined,
                  color: tab.methods.some((m) => String(m.id) === activeTab) ? "#0a5238" : undefined,
                }}
                onClick={() => {
                  const first = tab.methods[0];
                  if (first) setActiveTab(String(first.id));
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {catTabs.map((tab) =>
            tab.methods.some((m) => String(m.id) === activeTab) ? (
              <div key={tab.key} className="mt-5 space-y-3">
                {tab.methods.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setActiveTab(String(m.id))}
                    className={`w-full text-left rounded-2xl border-2 p-4 transition-all ${String(m.id) === activeTab ? "border-[var(--jx-neon)] bg-[var(--jx-neon-soft)]" : "border-[var(--jx-line)] bg-white hover:border-gray-300"}`}
                  >
                    <div className="flex items-center gap-3">
                      {m.type === "qris" && m.qris_image ? (
                        <img src={m.qris_image} alt={m.name} className="w-11 h-11 rounded-xl object-cover border border-gray-200" />
                      ) : (
                        <span className="w-11 h-11 rounded-xl grid place-items-center text-[11px] font-extrabold text-white shrink-0" style={{ background: m.color }}>
                          {m.code}
                        </span>
                      )}
                      <div>
                        <p className="font-bold text-[13px]">{m.name}</p>
                        <p className="text-[11px] text-[var(--jx-muted)]">
                          {m.type === "qris" ? "Scan QR untuk bayar" : `${m.account_number || "-"} • ${m.account_name || "-"}`}
                        </p>
                      </div>
                      {String(m.id) === activeTab && (
                        <svg className="ml-auto text-[var(--jx-neon)]" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            ) : null
          )}

          {selectedPayment && (
            <div className="mt-5">
              {selectedPayment.type === "qris" ? (
                <div className="rounded-2xl border border-[var(--jx-line)] p-5 text-center">
                  <p className="text-[12px] font-bold text-[var(--jx-muted)]">
                    Scan QR di bawah dengan aplikasi apa pun yang mendukung QRIS
                  </p>
                  {selectedPayment.qris_image ? (
                    <img
                      src={selectedPayment.qris_image}
                      alt="QRIS"
                      className="mx-auto mt-4 border-8 border-white rounded-2xl"
                      style={{ width: 220, height: 220, objectFit: "cover" }}
                    />
                  ) : (
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
                  )}
                  <p className="font-display font-extrabold text-[19px] mt-4">Rp133.000</p>
                  <p className="text-[12px] text-[var(--jx-muted)]">a.n. JUEVIX DIGITAL INDONESIA</p>
                  <div className="flex flex-wrap gap-2 justify-center mt-4">
                    <a href="#" download className="jx-btn jx-btn-primary">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M12 3v12M7 11l5 5 5-5M4 21h16" />
                      </svg>
                      Download QR
                    </a>
                    <button className="jx-btn jx-btn-ghost" onClick={() => navigator.clipboard?.writeText("Rp133.000")}>
                      Salin Nominal
                    </button>
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl border border-[var(--jx-line)] p-5">
                  <div className="flex items-center gap-3">
                    <span className="w-11 h-11 rounded-xl grid place-items-center text-[11px] font-extrabold text-white" style={{ background: selectedPayment.color }}>
                      {selectedPayment.code}
                    </span>
                    <div>
                      <p className="font-bold text-[13px]">{selectedPayment.name}</p>
                      <p className="text-[12px] text-[var(--jx-muted)]">a.n. {selectedPayment.account_name || "JUEVIX DIGITAL INDONESIA"}</p>
                    </div>
                  </div>
                  <p className="text-[12px] font-bold text-[var(--jx-muted)] mt-4">Nomor {selectedPayment.category === "va" ? "Virtual Account" : "Rekening / E-Wallet"}</p>
                  <div className="flex flex-wrap items-center gap-3 mt-1">
                    <p className="font-display font-extrabold text-[22px] sm:text-[26px] tracking-wide tabular-nums break-all">
                      {selectedPayment.account_number || "-"}
                    </p>
                    <button
                      className="jx-btn jx-btn-soft"
                      onClick={() => navigator.clipboard?.writeText(selectedPayment.account_number || "")}
                    >
                      Salin
                    </button>
                  </div>
                  <div className="flex justify-between items-end mt-4 pt-4 border-t border-[var(--jx-line)]">
                    <span className="text-[13px] font-bold">Total Bayar</span>
                    <span className="font-display font-extrabold text-[19px] text-[var(--jx-neon-600)]">Rp133.000</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <aside className="min-w-0">
          <div className="jx-panel p-5 lg:sticky jx-sticky" style={{ top: 84 }}>
            <h2 className="font-display font-extrabold text-[15px] mb-4">Ringkasan Pesanan</h2>
            <div className="flex items-center gap-3 pb-4 border-b border-[var(--jx-line)]">
              <Image src="/ml-banner.png" alt="Mobile Legends" width={48} height={48} className="w-12 h-12 rounded-xl object-cover" />
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
                <dd className="font-bold text-right">{selectedPayment?.name || "-"}</dd>
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
              <button className="jx-btn jx-btn-ghost text-[12px]" style={{ minHeight: 36 }} onClick={() => navigator.clipboard?.writeText("JVX-20260913-8842")}>
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
        <a href="https://wa.me/6281234567890" className="jx-btn jx-btn-primary">Hubungi CS via WhatsApp</a>
      </section>
    </main>
  );
}
