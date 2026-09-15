"use client";

import { useState } from "react";

export default function CekTransaksiPage() {
  const [invoice, setInvoice] = useState("");
  const [showEmpty, setShowEmpty] = useState(true);
  const [showNotFound, setShowNotFound] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [resultInvoice, setResultInvoice] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const v = invoice.trim();
    setShowEmpty(false);
    setShowNotFound(false);
    setShowResult(false);

    if (!v) {
      setShowEmpty(true);
      return;
    }

    if (/^JVX/i.test(v)) {
      setResultInvoice(v.toUpperCase());
      setShowResult(true);
    } else {
      setShowNotFound(true);
    }
  }

  return (
    <main className="mx-auto max-w-[1200px] px-3 sm:px-5 py-4 pb-28 lg:pb-8">
      {/* Hero */}
      <section className="jx-hero rounded-[20px] px-6 sm:px-10 py-9 sm:py-12 text-center">
        <span className="jx-badge text-[var(--jx-neon)]" style={{ background: "rgba(0,217,126,.14)" }}>
          STATUS REAL-TIME
        </span>
        <h1 className="font-display text-white text-[26px] sm:text-[36px] font-extrabold mt-3">
          Cek Status Transaksi
        </h1>
        <p className="text-white/65 mt-2 text-[13px] sm:text-sm max-w-lg mx-auto leading-relaxed">
          Lacak pesanan top up kamu kapan saja. Cukup masukkan nomor invoice atau Order ID yang dikirim setelah pembayaran.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 max-w-xl mx-auto flex flex-col sm:flex-row gap-2.5">
          <input
            className="jx-input flex-1"
            style={{ minHeight: 50 }}
            placeholder="Contoh: JVX-20260913-8842"
            autoComplete="off"
            value={invoice}
            onChange={(e) => setInvoice(e.target.value)}
          />
          <button type="submit" className="jx-btn jx-btn-primary" style={{ minHeight: 50 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            Cek Transaksi
          </button>
        </form>
        <p className="text-white/45 text-[11px] mt-3">
          Coba demo: ketik <b className="text-[var(--jx-neon)]">JVX-20260913-8842</b>
        </p>
      </section>

      {/* Empty State */}
      {showEmpty && (
        <section className="jx-panel mt-5 px-6 py-14 text-center">
          <div
            className="w-20 h-20 mx-auto rounded-3xl grid place-items-center"
            style={{ background: "linear-gradient(180deg,#eafaf2,#ffffff)", border: "1px solid #d9f2e6" }}
          >
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#00b96b" strokeWidth="1.7">
              <path d="M6 2h9l5 5v15H6z" />
              <path d="M15 2v5h5M9 13h6M9 17h4" />
            </svg>
          </div>
          <h2 className="font-display font-extrabold text-[17px] mt-5">Belum ada transaksi yang dicari</h2>
          <p className="text-[13px] text-[var(--jx-muted)] mt-2 max-w-md mx-auto leading-relaxed">
            Masukkan nomor invoice untuk melihat status transaksi kamu. Nomor invoice ada di email konfirmasi atau halaman pembayaran.
          </p>
          <div className="flex flex-wrap gap-2 justify-center mt-5">
            <a href="/game/mobile-legends" className="jx-btn jx-btn-ghost">Top Up Game</a>
            <a href="https://wa.me/6281234567890" className="jx-btn jx-btn-soft">Hubungi CS</a>
          </div>
        </section>
      )}

      {/* Not Found */}
      {showNotFound && (
        <section className="jx-panel mt-5 px-6 py-12 text-center">
          <div className="w-16 h-16 mx-auto rounded-2xl grid place-items-center bg-[#ffe8e8]">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#b91c1c" strokeWidth="2">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v6M12 16h.01" />
            </svg>
          </div>
          <h2 className="font-display font-extrabold text-[17px] mt-4">Invoice tidak ditemukan</h2>
          <p className="text-[13px] text-[var(--jx-muted)] mt-2 max-w-md mx-auto leading-relaxed">
            Pastikan nomor invoice yang kamu masukkan benar (format <b>JVX-XXXXXXXX-XXXX</b>). Kalau masih gagal, hubungi CS kami.
          </p>
          <a href="https://wa.me/6281234567890" className="jx-btn jx-btn-primary mt-5">Hubungi CS</a>
        </section>
      )}

      {/* Result */}
      {showResult && (
        <section className="mt-5 grid lg:grid-cols-[minmax(0,1fr)_340px] gap-4 items-start">
          <div className="jx-panel p-5 sm:p-6 min-w-0">
            <div className="flex flex-wrap items-start justify-between gap-3 pb-5 border-b border-[var(--jx-line)]">
              <div>
                <p className="text-[12px] text-[var(--jx-muted)] font-semibold">Nomor Invoice</p>
                <p className="font-display font-extrabold text-[19px] mt-0.5">{resultInvoice}</p>
                <p className="text-[12px] text-[var(--jx-muted)] mt-1">13 September 2026 • 20:41 WIB</p>
              </div>
              <span className="jx-badge jx-ok text-[12px] py-2 px-3">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M20 6 9 17l-5-5" />
                </svg>{" "}
                Berhasil
              </span>
            </div>

            {/* Timeline */}
            <div className="py-6 border-b border-[var(--jx-line)]">
              <p className="text-[12px] font-extrabold tracking-wider text-[var(--jx-muted)] mb-5">TIMELINE STATUS</p>

              {/* Desktop */}
              <ol className="hidden sm:grid grid-cols-3 relative">
                {["Menunggu Pembayaran", "Diproses", "Selesai"].map((step, i) => (
                  <li key={i} className="relative text-center">
                    {i < 2 && <div className="absolute top-[14px] left-1/2 w-full h-[3px] bg-[var(--jx-neon)]" />}
                    <span className="relative z-10 w-8 h-8 mx-auto rounded-full grid place-items-center bg-[var(--jx-neon)] text-[#04251a]">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </span>
                    <p className="font-bold text-[13px] mt-2">{step}</p>
                    <p className="text-[11px] text-[var(--jx-muted)]">20:4{i} WIB</p>
                  </li>
                ))}
              </ol>

              {/* Mobile */}
              <ol className="sm:hidden space-y-0">
                {["Menunggu Pembayaran", "Diproses", "Selesai"].map((step, i) => (
                  <li key={i} className={`flex gap-3 relative ${i < 2 ? "pb-6" : ""}`}>
                    {i < 2 && <div className="absolute left-[15px] top-8 bottom-0 w-[3px] bg-[var(--jx-neon)]" />}
                    <span className="relative z-10 w-8 h-8 shrink-0 rounded-full grid place-items-center bg-[var(--jx-neon)] text-[#04251a]">
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </span>
                    <div>
                      <p className="font-bold text-[13px]">{step}</p>
                      <p className="text-[11px] text-[var(--jx-muted)]">13 Sep 2026 • 20:4{i} WIB</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* Detail */}
            <div className="pt-5 grid sm:grid-cols-2 gap-x-6 gap-y-4">
              {[
                ["Game", "Mobile Legends: Bang Bang"],
                ["Nickname", "JuevixPlayer678"],
                ["User ID", "12345678"],
                ["Server ID", "2145"],
                ["Produk", "500 Diamond"],
                ["Metode Pembayaran", "QRIS"],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="text-[12px] text-[var(--jx-muted)] font-semibold">{label}</p>
                  <p className="font-bold text-[14px] mt-0.5">{value}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-2xl bg-[#f6f9f8] p-4">
              <dl className="text-[13px] space-y-2">
                <div className="flex justify-between">
                  <dt className="text-[var(--jx-muted)]">Subtotal</dt>
                  <dd className="font-bold">Rp132.000</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[var(--jx-muted)]">Biaya admin</dt>
                  <dd className="font-bold">Rp1.000</dd>
                </div>
                <div className="flex justify-between pt-2 border-t border-[var(--jx-line)]">
                  <dt className="font-bold">Total Bayar</dt>
                  <dd className="font-display font-extrabold text-[18px] text-[var(--jx-neon-600)]">Rp133.000</dd>
                </div>
              </dl>
            </div>

            <div className="flex flex-wrap gap-2 mt-5">
              <a href="https://wa.me/6281234567890" className="jx-btn jx-btn-primary">Hubungi CS</a>
              <a href="/game/mobile-legends" className="jx-btn jx-btn-ghost">Beli Lagi</a>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="jx-panel p-5">
            <h3 className="font-display font-extrabold text-[15px]">Arti Status</h3>
            <ul className="mt-4 space-y-3 text-[13px]">
              <li className="flex items-start gap-2.5">
                <span className="jx-badge jx-wait mt-0.5">Menunggu</span>
                <span className="text-[var(--jx-muted)] leading-snug">Pesanan dibuat, pembayaran belum diterima.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="jx-badge jx-wait mt-0.5">Diproses</span>
                <span className="text-[var(--jx-muted)] leading-snug">Pembayaran diterima, item sedang dikirim ke akun.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="jx-badge jx-ok mt-0.5">Berhasil</span>
                <span className="text-[var(--jx-muted)] leading-snug">Item sudah masuk ke akun game kamu.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="jx-badge jx-fail mt-0.5">Gagal</span>
                <span className="text-[var(--jx-muted)] leading-snug">Transaksi batal / kedaluwarsa. Dana otomatis dikembalikan.</span>
              </li>
            </ul>
            <div className="mt-5 pt-5 border-t border-[var(--jx-line)]">
              <p className="text-[13px] text-[var(--jx-muted)] leading-relaxed">
                Ada kendala dengan pesanan kamu? CS Juevix online 24 jam.
              </p>
              <a href="https://wa.me/6281234567890" className="jx-btn jx-btn-soft w-full mt-3">
                Chat WhatsApp
              </a>
            </div>
          </aside>
        </section>
      )}
    </main>
  );
}
