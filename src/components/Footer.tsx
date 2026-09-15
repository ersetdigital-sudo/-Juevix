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
            <a href="#" className="w-9 h-9 rounded-lg grid place-items-center text-white hover:opacity-80 transition-opacity" style={{ background: "#12241d" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3Z" fill="currentColor"/>
              </svg>
            </a>
            <a href="#" className="w-9 h-9 rounded-lg grid place-items-center text-white hover:opacity-80 transition-opacity" style={{ background: "#12241d" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 0 1 15.54 3h-3.09v12.4a2.592 2.592 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V9.66c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7V9.01a7.35 7.35 0 0 0 4.3 1.38V7.3s-1.88.09-3.24-1.48Z"/>
              </svg>
            </a>
            <a href="#" className="w-9 h-9 rounded-lg grid place-items-center text-white hover:opacity-80 transition-opacity" style={{ background: "#12241d" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73Z"/>
              </svg>
            </a>
            <a href="https://wa.me/6281234567890" className="w-9 h-9 rounded-lg grid place-items-center text-white hover:opacity-80 transition-opacity" style={{ background: "#12241d" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
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
