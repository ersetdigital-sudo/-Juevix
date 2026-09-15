"use client";

import { useState } from "react";
import { useSettings } from "@/components/SettingsContext";

interface OrderData {
  invoice: string;
  game_name: string;
  game_slug: string;
  user_id: string;
  server_id: string;
  nickname: string | null;
  product_label: string;
  price: number;
  admin_fee: number;
  total: number;
  payment_method: string;
  status: string;
  created_at: string;
}

function formatRupiah(n: number) {
  return "Rp" + n.toLocaleString("id-ID");
}

export default function CekTransaksiPage() {
  const { whatsapp, cs_text } = useSettings();
  const [invoice, setInvoice] = useState("");
  const [loading, setLoading] = useState(false);
  const [showEmpty, setShowEmpty] = useState(true);
  const [showNotFound, setShowNotFound] = useState(false);
  const [order, setOrder] = useState<OrderData | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const v = invoice.trim();
    setShowEmpty(false);
    setShowNotFound(false);
    setOrder(null);

    if (!v) {
      setShowEmpty(true);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/orders/${encodeURIComponent(v.toUpperCase())}`);
      const data = await res.json();
      if (data.error) {
        setShowNotFound(true);
      } else {
        setOrder(data);
      }
    } catch {
      setShowNotFound(true);
    }
    setLoading(false);
  }

  const statusBadge = (s: string) => {
    if (s === "paid" || s === "completed") return <span className="jx-badge jx-ok"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20 6 9 17l-5-5" /></svg>{" "}Berhasil</span>;
    if (s === "failed" || s === "cancelled") return <span className="jx-badge jx-fail"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="m6 6 12 12M18 6 6 18" /></svg>{" "}Gagal</span>;
    if (s === "processing") return <span className="jx-badge jx-wait">Diproses</span>;
    return <span className="jx-badge jx-wait">Menunggu</span>;
  };

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
            placeholder="Masukkan nomor invoice..."
            autoComplete="off"
            value={invoice}
            onChange={(e) => setInvoice(e.target.value)}
          />
          <button type="submit" disabled={loading} className="jx-btn jx-btn-primary" style={{ minHeight: 50 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="11" cy="11" r="7" />
              <path d="m20 20-3.5-3.5" />
            </svg>
            {loading ? "Mencari..." : "Cek Transaksi"}
          </button>
        </form>
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
            <a href="/" className="jx-btn jx-btn-ghost">Top Up Game</a>
            <a href={whatsapp ? `https://wa.me/${whatsapp}` : "#"} className="jx-btn jx-btn-soft">Hubungi CS</a>
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
            Pastikan nomor invoice yang kamu masukkan benar. Kalau masih gagal, hubungi CS kami.
          </p>
          <a href={whatsapp ? `https://wa.me/${whatsapp}` : "#"} className="jx-btn jx-btn-primary mt-5">Hubungi CS</a>
        </section>
      )}

      {/* Result */}
      {order && (
        <section className="mt-5 grid lg:grid-cols-[minmax(0,1fr)_340px] gap-4 items-start">
          <div className="jx-panel p-5 sm:p-6 min-w-0">
            <div className="flex flex-wrap items-start justify-between gap-3 pb-5 border-b border-[var(--jx-line)]">
              <div>
                <p className="text-[12px] text-[var(--jx-muted)] font-semibold">Nomor Invoice</p>
                <p className="font-display font-extrabold text-[19px] mt-0.5">{order.invoice}</p>
                <p className="text-[12px] text-[var(--jx-muted)] mt-1">
                  {new Date(order.created_at).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                </p>
              </div>
              {statusBadge(order.status)}
            </div>

            {/* Detail */}
            <div className="pt-5 grid sm:grid-cols-2 gap-x-6 gap-y-4">
              {(() => {
                const fields: [string, string][] = [
                  ["Game", order.game_name],
                  ["User ID", order.user_id],
                  ["Produk", order.product_label],
                  ["Metode Pembayaran", order.payment_method],
                ];
                if (order.server_id) fields.splice(2, 0, ["Server ID", order.server_id]);
                if (order.nickname) fields.splice(1, 0, ["Nickname", order.nickname]);
                return fields;
              })().map(([label, value]) => (
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
                  <dd className="font-bold">{formatRupiah(order.price)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[var(--jx-muted)]">Biaya admin</dt>
                  <dd className="font-bold">{formatRupiah(order.admin_fee)}</dd>
                </div>
                <div className="flex justify-between pt-2 border-t border-[var(--jx-line)]">
                  <dt className="font-bold">Total Bayar</dt>
                  <dd className="font-display font-extrabold text-[18px] text-[var(--jx-neon-600)]">{formatRupiah(order.total)}</dd>
                </div>
              </dl>
            </div>

            <div className="flex flex-wrap gap-2 mt-5">
              <a href={whatsapp ? `https://wa.me/${whatsapp}` : "#"} className="jx-btn jx-btn-primary">Hubungi CS</a>
              <a href={`/game/${order.game_slug}`} className="jx-btn jx-btn-ghost">Beli Lagi</a>
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
                {cs_text || "Ada kendala dengan pesanan kamu? Tim CS kami online 24 jam."}
              </p>
              {whatsapp && (
                <a href={`https://wa.me/${whatsapp}`} className="jx-btn jx-btn-soft w-full mt-3">
                  Chat WhatsApp
                </a>
              )}
            </div>
          </aside>
        </section>
      )}
    </main>
  );
}
