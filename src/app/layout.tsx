import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Sora } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Juevix — Top Up Game, Lebih Mudah",
    template: "%s — Juevix",
  },
  description:
    "Juevix: top up diamond, gems, dan voucher game favorit kamu. Proses instan 24 jam, harga termurah, transaksi aman.",
  keywords: ["top up game", "diamond mobile legends", "top up murah", "juevix"],
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Juevix — Top Up Game, Lebih Mudah",
    description: "Top up diamond, gems, dan voucher game favorit kamu. Proses instan 24 jam.",
    locale: "id_ID",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#04251a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${plusJakarta.variable} ${sora.variable}`}>
      <body>{children}</body>
    </html>
  );
}
