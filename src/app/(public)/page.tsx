import { HeroSlider } from "@/components/HeroSlider";
import { GameGrid } from "@/components/GameGrid";
import { Sidebar } from "@/components/Sidebar";
import { getGames, getCategories, getHeroSlides } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [games, categories, heroSlides] = await Promise.all([
    getGames(),
    getCategories(),
    getHeroSlides(),
  ]);

  return (
    <div className="mx-auto max-w-[1200px] px-3 sm:px-5 py-4 pb-28 lg:pb-8 grid gap-5 lg:grid-cols-[228px_minmax(0,1fr)]">
      <Sidebar categories={categories} />
      <main className="min-w-0">
        <HeroSlider slides={heroSlides} />
        <GameGrid games={games} categories={categories} />
      </main>
    </div>
  );
}
