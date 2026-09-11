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
    path: `/game/${slug}/pitch-deck`,
  });
}

export default async function PitchDeck({ params }: Props) {
  const { slug } = await params;
  const game = await gameBySlug(slug);
  const { pitch_deck: pitchDeck } = game;

  if (pitchDeck) {
    redirect(pitchDeck);
  }

  return (
    <section className="p-game-details">
      <header>
        <h1>{game.name} PitchDeck</h1>
      </header>
      <Box>
        <Markdown>No pitch deck for this game.</Markdown>
      </Box>
    </section>
  );
}
