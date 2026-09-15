import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-white border-t border-[var(--jx-line)]">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 py-9 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <span
              className="w-9 h-9 rounded-xl grid place-items-center"
              style={{
                background: "linear-gradient(135deg,#04251a,#0a5238)",
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 2 4 9l8 13 8-13-8-7Z"
                  fill="#00D97E"
                />
              </svg>
            </span>
            <span className="font-display font-extrabold text-[17px]">
              Juevix
            </span>
          </div>
          <p className="text-[13px] text-[var(--jx-muted)] mt-3 leading-relaxed">
            Top up diamond, gems, dan voucher game favoritmu. Proses instan 24
            jam, harga termurah.
          </p>
        </div>
        <div>
          <h4 className="font-bold text-[13px] mb-3">Menu</h4>
          <ul className="space-y-2 text-[13px] text-[var(--jx-muted)]">
            <li>
              <Link href="/" className="hover:text-[var(--jx-neon-600)]">
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/game/mobile-legends"
                className="hover:text-[var(--jx-neon-600)]"
              >
                Topup Game
              </Link>
            </li>
            <li>
              <Link
                href="/cek-transaksi"
                className="hover:text-[var(--jx-neon-600)]"
              >
                Cek Transaksi
              </Link>
            </li>
            <li>
              <Link href="/" className="hover:text-[var(--jx-neon-600)]">
                Semua Game
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-[13px] mb-3">Bantuan</h4>
          <ul className="space-y-2 text-[13px] text-[var(--jx-muted)]">
            <li>
              <a
                href="mailto:halo@juevix.net"
                className="hover:text-[var(--jx-neon-600)]"
              >
                halo@juevix.net
              </a>
            </li>
            <li>
              <Link
                href="/game/mobile-legends#cara"
                className="hover:text-[var(--jx-neon-600)]"
              >
                Cara Top Up
              </Link>
            </li>
            <li>
              <a href="#" className="hover:text-[var(--jx-neon-600)]">
                Syarat &amp; Ketentuan
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-[var(--jx-neon-600)]">
                Kebijakan Privasi
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-[13px] mb-3">Ikuti Kami</h4>
          <div className="flex gap-2">
            <a
              href="#"
              className="w-9 h-9 rounded-lg grid place-items-center text-white"
              style={{ background: "#12241d" }}
            >
              IG
            </a>
            <a
              href="#"
              className="w-9 h-9 rounded-lg grid place-items-center text-white text-[11px] font-bold"
              style={{ background: "#12241d" }}
            >
              TT
            </a>
            <a
              href="#"
              className="w-9 h-9 rounded-lg grid place-items-center text-white text-[11px] font-bold"
              style={{ background: "#12241d" }}
            >
              YT
            </a>
            <a
              href="https://wa.me/6281234567890"
              className="w-9 h-9 rounded-lg grid place-items-center text-white text-[11px] font-bold"
              style={{ background: "#12241d" }}
            >
              WA
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-[var(--jx-line)] py-4 text-center text-[12px] text-[var(--jx-muted)] pb-24 lg:pb-4">
        &copy; 2026 Juevix. All rights reserved.
      </div>
    </footer>
  );
}
