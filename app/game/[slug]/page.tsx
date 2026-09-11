import Box from 'components/box';
import Markdown from 'components/markdown';
import { createMetadata } from 'lib/metadata';
import { gameBySlug } from 'lib/game';
import { url } from 'lib/site';

import './game-details.css';

export const dynamic = 'force-static';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const game = await gameBySlug(slug);

  return createMetadata({
    title: game.name,
    description: game.description,
    image: `${url}/${game.slug}.png`,
    path: `/game/${slug}`,
  });
}

export default async function GameDetails({ params }: Props) {
  const { slug } = await params;
  const game = await gameBySlug(slug);

  return (
    <section className="p-game-details">
      <img src={`/games/${game.slug}.png`} alt={game.name} />
      <header>
        <h1>{game.name}</h1>
        {game.subtitle ? <h3>{game.subtitle}</h3> : null}
      </header>
      <Box>
        <Markdown>{game.description}</Markdown>
      </Box>
    </section>
  );
}
