import { notFound } from "next/navigation";
import { getGameBySlug, getTopupNominals, getPaymentMethods } from "@/lib/db";
import { GameDetail } from "@/components/GameDetail";

export default async function GameDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [game, nominals, paymentCategories] = await Promise.all([
    getGameBySlug(slug),
    getTopupNominals(slug),
    getPaymentMethods(),
  ]);

  if (!game) {
    notFound();
  }

  return (
    <GameDetail
      game={game}
      nominals={nominals}
      paymentCategories={paymentCategories}
    />
  );
}
