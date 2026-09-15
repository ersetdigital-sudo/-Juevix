import { HeroSlider } from "@/components/HeroSlider";
import { GameGrid } from "@/components/GameGrid";
import { Sidebar } from "@/components/Sidebar";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-[1200px] px-3 sm:px-5 py-4 pb-28 lg:pb-8 grid gap-5 lg:grid-cols-[228px_minmax(0,1fr)]">
      <Sidebar />
      <main className="min-w-0">
        <HeroSlider />
        <GameGrid />
      </main>
    </div>
  );
}
