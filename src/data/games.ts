export interface Game {
  slug: string;
  name: string;
  category: string;
  rating: number;
  reviews: string;
  developer?: string;
  image?: string;
  gradient?: string;
  label?: string;
}

export interface Category {
  name: string;
  slug: string;
  icon: string;
}

export interface Platform {
  name: string;
  slug: string;
  icon: string;
}

export interface TopUpNominal {
  label: string;
  price: number;
  badge?: string;
  badgeType?: "ok" | "wait";
  originalPrice?: number;
}

export interface PaymentMethod {
  name: string;
  label: string;
  code: string;
  color: string;
}

export const categories: Category[] = [
  { name: "Semua Game", slug: "semua", icon: "home" },
  { name: "Moba Game", slug: "moba", icon: "gamepad" },
  { name: "RPG", slug: "rpg", icon: "sword" },
  { name: "Casual Game", slug: "casual", icon: "smile" },
  { name: "Strategy", slug: "strategy", icon: "building" },
  { name: "Simulator", slug: "simulator", icon: "clock" },
  { name: "Sports Game", slug: "sports", icon: "globe" },
  { name: "Adventure", slug: "adventure", icon: "layers" },
];

export const platforms: Platform[] = [
  { name: "Semua Platform", slug: "semua", icon: "grid" },
  { name: "Mobile", slug: "mobile", icon: "phone" },
  { name: "PC", slug: "pc", icon: "monitor" },
  { name: "Nintendo", slug: "nintendo", icon: "console" },
  { name: "Playstation 4", slug: "ps4", icon: "play" },
  { name: "Playstation 5", slug: "ps5", icon: "play" },
  { name: "X-Box", slug: "xbox", icon: "xbox" },
];

export const games: Game[] = [
  {
    slug: "mobile-legends",
    name: "Mobile Legends",
    category: "Moba Game",
    rating: 4.9,
    reviews: "12k",
    developer: "Moonton",
    image: "/ml-banner.png",
  },
  {
    slug: "honor-of-kings",
    name: "Honor of Kings",
    category: "Moba Game",
    rating: 4.8,
    reviews: "8k",
    gradient: "linear-gradient(140deg,#2a1b3d,#5b2a86)",
    label: "HONOR\nOF KINGS",
  },
  {
    slug: "arena-of-valor",
    name: "Arena of Valor",
    category: "Moba Game",
    rating: 4.7,
    reviews: "5k",
    gradient: "linear-gradient(140deg,#0a3d33,#12796a)",
    label: "ARENA of\nVALOR",
  },
  {
    slug: "dota-2",
    name: "Dota 2",
    category: "Moba Game",
    rating: 4.8,
    reviews: "6k",
    gradient: "linear-gradient(140deg,#2b0d0d,#7f1d1d)",
    label: "DOTA 2",
  },
  {
    slug: "league-of-legends",
    name: "League of Legends",
    category: "Moba Game",
    rating: 4.9,
    reviews: "10k",
    gradient: "linear-gradient(140deg,#0b1d4a,#2563eb)",
    label: "LEAGUE of\nLEGENDS",
  },
  {
    slug: "pokemon-unite",
    name: "Pokémon Unite",
    category: "Moba Game",
    rating: 4.6,
    reviews: "4k",
    gradient: "linear-gradient(140deg,#f5b700,#f97316)",
    label: "POKÉMON\nUNITE",
  },
  {
    slug: "heroes-evolved",
    name: "Heroes Evolved",
    category: "Moba Game",
    rating: 4.5,
    reviews: "3k",
    gradient: "linear-gradient(140deg,#3f2a12,#a16207)",
    label: "HEROES\nEVOLVED",
  },
  {
    slug: "vainglory",
    name: "Vainglory",
    category: "Moba Game",
    rating: 4.4,
    reviews: "2k",
    gradient: "linear-gradient(140deg,#241548,#6d28d9)",
    label: "VAIN\nGLORY",
  },
];

export const mlTopupNominals: TopUpNominal[] = [
  { label: "50 Diamond", price: 14500 },
  { label: "100 Diamond", price: 28000, badge: "Bonus 5", badgeType: "ok" },
  { label: "200 Diamond", price: 54000 },
  { label: "300 Diamond", price: 79000, badge: "Promo", badgeType: "wait", originalPrice: 85000 },
  { label: "500 Diamond", price: 132000 },
  { label: "1000 Diamond", price: 255000, badge: "Bonus 50", badgeType: "ok" },
  { label: "2000 Diamond", price: 499000 },
  { label: "Weekly Diamond Pass", price: 65000, badge: "Promo", badgeType: "wait" },
];

export const paymentCategories = {
  qris: { label: "QRIS", methods: [{ name: "QRIS", label: "QRIS", code: "QR", color: "#f2f6f4" }] },
  ewallet: {
    label: "E-WALLET",
    methods: [
      { name: "Dana", label: "DANA", code: "DANA", color: "#118eea" },
      { name: "OVO", label: "OVO", code: "OVO", color: "#4c3494" },
      { name: "GoPay", label: "GoPay", code: "GO", color: "#00aed6" },
      { name: "ShopeePay", label: "ShopeePay", code: "SP", color: "#ee4d2d" },
    ],
  },
  va: {
    label: "VIRTUAL ACCOUNT",
    methods: [
      { name: "BCA Virtual Account", label: "BCA", code: "BCA", color: "#0060af" },
      { name: "BRI Virtual Account", label: "BRI", code: "BRI", color: "#00529c" },
      { name: "BNI Virtual Account", label: "BNI", code: "BNI", color: "#f15a23" },
      { name: "Mandiri Virtual Account", label: "Mandiri", code: "MDR", color: "#003d79" },
    ],
  },
  minimarket: {
    label: "MINIMARKET",
    methods: [
      { name: "Alfamart", label: "Alfamart", code: "ALFA", color: "#e11d48" },
      { name: "Indomaret", label: "Indomaret", code: "INDO", color: "#1d4ed8" },
    ],
  },
};

export const heroSlides = [
  {
    image: "/ml-banner.png",
    alt: "Top Up Game Favorit Kamu — main lebih seru, lebih untung",
    href: "/game/mobile-legends",
  },
  {
    image: "/pubg-banner.png",
    alt: "Top Up UC PUBG Lebih Untung — survive more, play more",
    href: "/game/mobile-legends",
  },
  {
    image: "/genshin-banner.png",
    alt: "Top Up Genesis Crystals Genshin Impact — adventure awaits",
    href: "/game/mobile-legends",
  },
];
