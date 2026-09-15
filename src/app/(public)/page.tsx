import { HeroSlider } from "@/components/HeroSlider";
import { GameGrid } from "@/components/GameGrid";
import { Sidebar } from "@/components/Sidebar";
import { getGames, getCategories, getPlatforms, getHeroSlides } from "@/lib/db";

export default async function HomePage() {
  const [games, categories, platforms, heroSlides] = await Promise.all([
    getGames(),
    getCategories(),
    getPlatforms(),
    getHeroSlides(),
  ]);

  return (
    <div className="mx-auto max-w-[1200px] px-3 sm:px-5 py-4 pb-28 lg:pb-8 grid gap-5 lg:grid-cols-[228px_minmax(0,1fr)]">
      <Sidebar categories={categories} platforms={platforms} />
      <main className="min-w-0">
        <HeroSlider slides={heroSlides} />
        <GameGrid games={games} categories={categories} />
      </main>
    </div>
  );
}
