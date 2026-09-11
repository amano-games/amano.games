import { notFound } from 'next/navigation';

import { getGames } from 'utils/notion';
import type { Game } from 'types/game';

export async function gameStaticParams() {
  const games = await getGames();

  return games.map((item) => ({
    slug: item.slug,
  }));
}

export async function gameBySlug(slug: string): Promise<Game> {
  const games = await getGames();
  const game = games.find((item) => item.slug === slug);

  if (game == null) {
    notFound();
  }

  return game;
}
