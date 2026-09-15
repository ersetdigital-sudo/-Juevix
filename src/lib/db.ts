import { supabaseAdmin } from "./supabase-admin";
import type { Database } from "@/types/database";

type Game = Database["public"]["Tables"]["games"]["Row"];
type Category = Database["public"]["Tables"]["categories"]["Row"];
type Platform = Database["public"]["Tables"]["platforms"]["Row"];
type TopupNominal = Database["public"]["Tables"]["topup_nominals"]["Row"];
type PaymentMethod = Database["public"]["Tables"]["payment_methods"]["Row"];
type HeroSlide = Database["public"]["Tables"]["hero_slides"]["Row"];

export type {
  Game,
  Category,
  Platform,
  TopupNominal,
  PaymentMethod,
  HeroSlide,
};

export interface PaymentCategory {
  label: string;
  methods: PaymentMethod[];
}

export async function getGames(): Promise<Game[]> {
  const { data, error } = await supabaseAdmin
    .from("games")
    .select("*")
    .order("sort_order");

  if (error) {
    console.error("Error fetching games:", error);
    return [];
  }
  return data || [];
}

export async function getGameBySlug(slug: string): Promise<Game | null> {
  const { data, error } = await supabaseAdmin
    .from("games")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error("Error fetching game:", error);
    return null;
  }
  return data;
}

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabaseAdmin
    .from("categories")
    .select("*")
    .order("sort_order");

  if (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
  return data || [];
}

export async function getPlatforms(): Promise<Platform[]> {
  const { data, error } = await supabaseAdmin
    .from("platforms")
    .select("*")
    .order("sort_order");

  if (error) {
    console.error("Error fetching platforms:", error);
    return [];
  }
  return data || [];
}

export async function getTopupNominals(
  gameSlug: string
): Promise<TopupNominal[]> {
  const { data, error } = await supabaseAdmin
    .from("topup_nominals")
    .select("*")
    .eq("game_slug", gameSlug)
    .order("sort_order");

  if (error) {
    console.error("Error fetching nominals:", error);
    return [];
  }
  return data || [];
}

export async function getPaymentMethods(): Promise<PaymentCategory[]> {
  const { data, error } = await supabaseAdmin
    .from("payment_methods")
    .select("*")
    .order("sort_order");

  if (error) {
    console.error("Error fetching payment methods:", error);
    return [];
  }

  const methods = data || [];
  const categories: Record<string, PaymentCategory> = {};

  for (const m of methods) {
    if (!categories[m.category]) {
      const catLabel =
        m.category === "qris"
          ? "QRIS"
          : m.category === "ewallet"
          ? "E-WALLET"
          : m.category === "va"
          ? "VIRTUAL ACCOUNT"
          : "MINIMARKET";
      categories[m.category] = { label: catLabel, methods: [] };
    }
    categories[m.category].methods.push(m);
  }

  return Object.values(categories);
}

export async function getHeroSlides(): Promise<HeroSlide[]> {
  const { data, error } = await supabaseAdmin
    .from("hero_slides")
    .select("*")
    .eq("is_active", true)
    .order("sort_order");

  if (error) {
    console.error("Error fetching hero slides:", error);
    return [];
  }
  return data || [];
}
