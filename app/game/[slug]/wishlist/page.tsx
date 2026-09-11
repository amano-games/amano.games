import { redirect } from 'next/navigation';

import Box from 'components/box';
import Markdown from 'components/markdown';
import { createMetadata } from 'lib/metadata';
import { gameBySlug } from 'lib/game';

import '../game-details.css';

export const dynamic = 'force-static';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  await gameBySlug(slug);

  return createMetadata({
    path: `/game/${slug}/wishlist`,
  });
}

export default async function Wishlist({ params }: Props) {
  const { slug } = await params;
  const game = await gameBySlug(slug);

  if (game.wishlist) {
    redirect(game.wishlist);
  }

  return (
    <section className="p-game-details">
      <header>
        <h1>{game.name} Wishlist</h1>
      </header>
      <Box>
        <Markdown>No wishlist link for this game.</Markdown>
      </Box>
    </section>
  );
}
