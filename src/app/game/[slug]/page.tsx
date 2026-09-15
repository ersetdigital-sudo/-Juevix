"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { mlTopupNominals, paymentCategories } from "@/data/games";

const faqData = [
  {
    q: "Berapa lama diamond masuk ke akun?",
    a: "Rata-rata 3–30 detik setelah pembayaran terkonfirmasi. Kalau lewat 10 menit belum masuk, cek status di halaman Cek Transaksi atau hubungi CS kami.",
  },
  {
    q: "Apakah akun saya aman?",
    a: "Aman. Juevix hanya meminta User ID dan Server ID — tidak pernah meminta password, kode OTP, atau akses login akun kamu.",
  },
  {
    q: "Di mana saya bisa melihat User ID dan Server ID?",
    a: "Buka Mobile Legends → klik avatar di pojok kiri atas → ID tampil di bawah nama dengan format 12345678 (2145). Angka pertama User ID, angka dalam kurung Server ID.",
  },
  {
    q: "Salah memasukkan User ID, bisa direfund?",
    a: "Kalau diamond sudah terkirim ke ID yang salah, transaksi tidak bisa dibatalkan. Makanya selalu klik Cek Nickname sebelum bayar.",
  },
  {
    q: "Metode pembayaran apa saja yang tersedia?",
    a: "QRIS, e-wallet (Dana, OVO, GoPay, ShopeePay), virtual account (BCA, BRI, BNI, Mandiri), dan minimarket (Alfamart, Indomaret).",
  },
];

const reviews = [
  {
    name: "Rizky Ananda",
    initials: "RA",
    gradient: "linear-gradient(135deg,#0a5238,#00D97E)",
    text: "\"Pesan 500 diamond jam 2 pagi, masuk kurang dari 10 detik. Harganya juga paling murah dibanding lapak lain.\"",
    time: "2 hari lalu",
    stars: "★★★★★",
  },
  {
    name: "Dimas Pratama",
    initials: "DP",
    gradient: "linear-gradient(135deg,#1d4ed8,#38bdf8)",
    text: "\"Fitur Cek Nickname ngebantu banget, jadi nggak takut salah ID. Bayar pakai QRIS langsung beres.\"",
    time: "5 hari lalu",
    stars: "★★★★★",
  },
  {
    name: "Sinta Wulandari",
    initials: "SW",
    gradient: "linear-gradient(135deg,#7c2d12,#f59e0b)",
    text: "\"Sempat pending 5 menit karena VA, tapi CS-nya fast response banget. Diamond akhirnya masuk semua.\"",
    time: "1 minggu lalu",
    stars: "★★★★☆",
  },
];

function formatRupiah(n: number) {
  return "Rp" + n.toLocaleString("id-ID");
}

export default function GameDetailPage() {
  const [userId, setUserId] = useState("");
  const [serverId, setServerId] = useState("");
  const [selectedNom, setSelectedNom] = useState<number | null>(null);
  const [selectedPay, setSelectedPay] = useState<string>("");
  const [nickResult, setNickResult] = useState<{ show: boolean; text: string; ok: boolean }>({
    show: false,
    text: "",
    ok: false,
  });

  const ADMIN = 1000;
  const nom = mlTopupNominals.find((n) => n.price === selectedNom);

  const subtotal = selectedNom ?? 0;
  const total = subtotal > 0 ? subtotal + ADMIN : 0;

  function checkNickname() {
    if (!userId.trim()) {
      setNickResult({ show: true, text: "Isi User ID dulu ya.", ok: false });
      return;
    }
    setNickResult({ show: true, text: "Mengecek nickname...", ok: false });
    setTimeout(() => {
      setNickResult({
        show: true,
        text: "Nickname ditemukan: JuevixPlayer" + userId.slice(-3),
        ok: true,
      });
    }, 700);
  }

  return (
    <main className="mx-auto max-w-[1200px] px-3 sm:px-5 py-4 pb-28 lg:pb-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-[12px] text-[var(--jx-muted)] font-semibold mb-3 px-1 flex-wrap">
        <Link href="/" className="hover:text-[var(--jx-neon-600)]">Home</Link>
        <span>›</span>
        <Link href="/" className="hover:text-[var(--jx-neon-600)]">Moba Game</Link>
        <span>›</span>
        <span className="text-[var(--jx-ink)]">Mobile Legends</span>
      </nav>

      {/* Hero */}
      <section className="jx-hero rounded-[20px] overflow-hidden">
        <div className="grid md:grid-cols-[280px_minmax(0,1fr)] items-stretch">
          <div className="relative h-48 md:h-auto md:min-h-[240px]">
            <Image
              src="/ml-banner.png"
              alt="Mobile Legends"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 md:bg-[linear-gradient(270deg,#04251a_0%,rgba(4,37,26,0)_60%)] bg-[linear-gradient(180deg,rgba(4,37,26,.1),#04251a)]" />
          </div>
          <div className="p-6 sm:p-8">
            <span className="jx-badge text-[var(--jx-neon)]" style={{ background: "rgba(0,217,126,.14)" }}>
              MOBA GAME
            </span>
            <h1 className="font-display text-white text-[26px] sm:text-[34px] font-extrabold leading-tight mt-3">
              Mobile Legends: Bang Bang
            </h1>
            <div className="flex items-center gap-3 mt-2 text-[13px] font-semibold">
              <span className="jx-stars text-[15px]">★★★★★</span>
              <span className="text-white">4.9</span>
              <span className="text-white/50">12.480 review</span>
              <span className="text-white/50 hidden sm:inline">• Moonton</span>
            </div>
            <p className="text-white/65 mt-3 text-[13px] sm:text-sm max-w-xl leading-relaxed">
              Top up diamond Mobile Legends langsung masuk ke akun kamu dalam hitungan detik.
              Cukup masukkan User ID dan Server ID, pilih nominal, bayar — selesai.
            </p>
            <div className="flex flex-wrap gap-2 mt-4 text-[11px] font-bold">
              <span className="jx-badge bg-white/10 text-white/80">⚡ Proses Instan</span>
              <span className="jx-badge bg-white/10 text-white/80">🛡 Resmi &amp; Aman</span>
              <span className="jx-badge bg-white/10 text-white/80">🏷 Harga Termurah</span>
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <div className="grid lg:grid-cols-[minmax(0,1fr)_340px] gap-4 mt-5">
        <div className="space-y-4 min-w-0">
          {/* 1. Akun */}
          <section className="jx-panel p-5">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-7 h-7 rounded-lg bg-[var(--jx-neon)] text-[#04251a] grid place-items-center font-extrabold text-[13px]">1</span>
              <h2 className="font-display font-extrabold text-[15px]">Masukkan Akun Game</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[12px] font-bold mb-1.5" htmlFor="userId">User ID</label>
                <input
                  id="userId"
                  className="jx-input"
                  inputMode="numeric"
                  placeholder="Contoh: 12345678"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-[12px] font-bold mb-1.5" htmlFor="serverId">Server ID</label>
                <input
                  id="serverId"
                  className="jx-input"
                  inputMode="numeric"
                  placeholder="Contoh: 2145"
                  value={serverId}
                  onChange={(e) => setServerId(e.target.value)}
                />
              </div>
            </div>
            <button type="button" onClick={checkNickname} className="jx-btn jx-btn-ghost mt-3">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
              Cek Nickname
            </button>
            {nickResult.show && (
              <p className={`mt-2 text-sm font-semibold ${nickResult.ok ? "text-emerald-600" : "text-red-600"}`}>
                {nickResult.text}
              </p>
            )}
            <p className="text-[12px] text-[var(--jx-muted)] mt-3 leading-relaxed">
              Cara lihat ID: buka game → klik avatar di pojok kiri atas → ID tampil di bawah nama.
              Contoh <b>12345678 (2145)</b> → User ID 12345678, Server ID 2145.
            </p>
          </section>

          {/* 2. Nominal */}
          <section className="jx-panel p-5">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-7 h-7 rounded-lg bg-[var(--jx-neon)] text-[#04251a] grid place-items-center font-extrabold text-[13px]">2</span>
              <h2 className="font-display font-extrabold text-[15px]">Pilih Nominal Top Up</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-2.5">
              {mlTopupNominals.map((n) => (
                <button
                  key={n.price}
                  type="button"
                  className={`jx-nom ${selectedNom === n.price ? "is-active" : ""}`}
                  onClick={() => setSelectedNom(n.price)}
                >
                  {n.badge && (
                    <span className={`absolute top-2 right-2 jx-badge ${n.badgeType === "ok" ? "jx-ok" : "jx-wait"}`}>
                      {n.badge}
                    </span>
                  )}
                  <span className="text-[13px] font-extrabold block">{n.label}</span>
                  <span className="text-[12px] text-[var(--jx-neon-600)] font-bold block mt-1">
                    {formatRupiah(n.price)}
                  </span>
                  {n.originalPrice && (
                    <span className="text-[11px] text-[var(--jx-muted)] line-through">
                      {formatRupiah(n.originalPrice)}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </section>

          {/* 3. Pembayaran */}
          <section className="jx-panel p-5">
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-7 h-7 rounded-lg bg-[var(--jx-neon)] text-[#04251a] grid place-items-center font-extrabold text-[13px]">3</span>
              <h2 className="font-display font-extrabold text-[15px]">Pilih Metode Pembayaran</h2>
            </div>

            {Object.entries(paymentCategories).map(([key, cat]) => (
              <div key={key} className="mb-5">
                <p className="text-[11px] font-extrabold tracking-wider text-[var(--jx-muted)] mb-2">
                  {cat.label}
                </p>
                <div className={`grid gap-2.5 ${
                  key === "qris" ? "sm:grid-cols-2" : "grid-cols-2 sm:grid-cols-4"
                }`}>
                  {cat.methods.map((m) => (
                    <button
                      key={m.name}
                      type="button"
                      className={`jx-pay ${selectedPay === m.name ? "is-active" : ""}`}
                      onClick={() => setSelectedPay(m.name)}
                    >
                      <span
                        className="w-9 h-9 rounded-lg grid place-items-center text-[10px] font-extrabold text-white shrink-0"
                        style={{ background: m.color }}
                      >
                        {m.code}
                      </span>
                      <span className="text-[13px] font-bold">
                        {m.label}
                        {key !== "qris" && (
                          <span className="block text-[11px] font-semibold text-[var(--jx-muted)]">
                            {m.name}
                          </span>
                        )}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </section>
        </div>

        {/* Ringkasan */}
        <aside className="min-w-0">
          <div className="jx-panel p-5 lg:sticky jx-sticky" style={{ top: 84 }}>
            <h2 className="font-display font-extrabold text-[15px] mb-4">Ringkasan Pesanan</h2>
            <div className="flex items-center gap-3 pb-4 border-b border-[var(--jx-line)]">
              <Image
                src="/ml-banner.png"
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
                <dt className="text-[var(--jx-muted)]">Produk</dt>
                <dd className="font-bold text-right">{nom?.label ?? "-"}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-[var(--jx-muted)]">Pembayaran</dt>
                <dd className="font-bold text-right">{selectedPay || "-"}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-[var(--jx-muted)]">Subtotal</dt>
                <dd className="font-bold text-right">{subtotal > 0 ? formatRupiah(subtotal) : "-"}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-[var(--jx-muted)]">Biaya admin</dt>
                <dd className="font-bold text-right">{subtotal > 0 ? formatRupiah(ADMIN) : "-"}</dd>
              </div>
            </dl>
            <div className="flex items-end justify-between pt-4">
              <span className="text-[13px] font-bold">Total Bayar</span>
              <span className="font-display text-[22px] font-extrabold text-[var(--jx-neon-600)]">
                {subtotal > 0 ? formatRupiah(total) : "Rp0"}
              </span>
            </div>
            <Link
              href="/pembayaran"
              className={`jx-btn jx-btn-primary w-full mt-4 ${!subtotal || !selectedPay || !userId.trim() ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}`}
              style={{ minHeight: 52 }}
            >
              Bayar Sekarang
            </Link>
            <p className="text-[11px] text-[var(--jx-muted)] text-center mt-2.5 leading-relaxed">
              Pastikan User ID &amp; Server ID sudah benar. Diamond masuk otomatis setelah pembayaran.
            </p>
          </div>
        </aside>
      </div>

      {/* Cara Top Up */}
      <section id="cara" className="mt-8">
        <h2 className="font-display text-lg sm:text-xl font-extrabold mb-1">Cara Top Up Mobile Legends</h2>
        <p className="text-[13px] text-[var(--jx-muted)] mb-4">Cuma 4 langkah, kurang dari satu menit.</p>
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-3">
          {[
            { title: "Masukkan User ID", desc: "Isi User ID dan Server ID, lalu klik Cek Nickname untuk memastikan akun benar.", icon: "user" },
            { title: "Pilih Nominal", desc: "Pilih jumlah diamond atau paket yang kamu butuhkan. Cek badge promo untuk bonus ekstra.", icon: "diamond" },
            { title: "Bayar", desc: "Pilih QRIS, e-wallet, virtual account, atau minimarket. Selesaikan pembayaran.", icon: "card" },
            { title: "Diamond Masuk", desc: "Diamond otomatis masuk dalam hitungan detik. Cek status kapan saja di Cek Transaksi.", icon: "check" },
          ].map((step, i) => (
            <div key={i} className="jx-card p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="w-10 h-10 rounded-xl bg-[var(--jx-neon-soft)] text-[var(--jx-neon-600)] grid place-items-center">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {step.icon === "user" && <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>}
                    {step.icon === "diamond" && <path d="M12 3 4 9l8 12 8-12-8-6Z" />}
                    {step.icon === "card" && <><rect x="2" y="5" width="20" height="14" rx="3" /><path d="M2 10h20" /></>}
                    {step.icon === "check" && <path d="M20 6 9 17l-5-5" />}
                  </svg>
                </span>
                <span className="font-display text-3xl font-extrabold text-[#eef3f1]">{i + 1}</span>
              </div>
              <h3 className="font-bold text-[14px]">{step.title}</h3>
              <p className="text-[12px] text-[var(--jx-muted)] mt-1 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mt-8 grid lg:grid-cols-[minmax(0,1fr)_340px] gap-4 items-start">
        <div>
          <h2 className="font-display text-lg sm:text-xl font-extrabold mb-1">FAQ Top Up Mobile Legends</h2>
          <p className="text-[13px] text-[var(--jx-muted)] mb-4">Pertanyaan yang paling sering ditanyakan.</p>
          {faqData.map((faq, i) => (
            <details key={i} className="jx-acc" open={i === 0}>
              <summary>
                {faq.q}
                <svg className="jx-chev" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </summary>
              <div>{faq.a}</div>
            </details>
          ))}
        </div>

        <div className="jx-panel p-5">
          <h3 className="font-display font-extrabold text-[15px]">Masih bingung?</h3>
          <p className="text-[13px] text-[var(--jx-muted)] mt-1.5 leading-relaxed">
            Tim CS Juevix online 24 jam dan siap bantu proses top up kamu.
          </p>
          <a href="https://wa.me/6281234567890" className="jx-btn jx-btn-primary w-full mt-4">
            Hubungi CS WhatsApp
          </a>
          <Link href="/cek-transaksi" className="jx-btn jx-btn-ghost w-full mt-2">
            Cek Status Transaksi
          </Link>
        </div>
      </section>

      {/* Reviews */}
      <section className="mt-8">
        <div className="flex items-end justify-between mb-4">
          <div>
            <h2 className="font-display text-lg sm:text-xl font-extrabold">Review Pemain</h2>
            <p className="text-[13px] text-[var(--jx-muted)]">4.9 dari 5 · 12.480 review terverifikasi</p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-3">
          {reviews.map((r, i) => (
            <article key={i} className="jx-card p-5">
              <div className="flex items-center gap-3">
                <span
                  className="w-10 h-10 rounded-full grid place-items-center font-extrabold text-white text-[13px]"
                  style={{ background: r.gradient }}
                >
                  {r.initials}
                </span>
                <div>
                  <p className="font-bold text-[13px]">{r.name}</p>
                  <p className="jx-stars text-[12px]">{r.stars}</p>
                </div>
              </div>
              <p className="text-[13px] text-[var(--jx-muted)] mt-3 leading-relaxed">{r.text}</p>
              <p className="text-[11px] text-[var(--jx-muted)] mt-3">{r.time}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
