import { useEffect } from 'react';
import type { GetStaticPaths, GetStaticProps } from 'next';

import { getGames } from 'utils/notion';
import { routeSlug } from 'lib/api';
import type { Game } from 'types/game';

import Seo from 'components/seo';
import Header from 'components/header';
import Box from 'components/box';
import Markdown from 'components/markdown';

type Props = {
  game: Game;
};

function PitchDeck({ game }: Props) {
  const { pitch_deck: pitchDeck } = game;
  useEffect(() => {
    if (pitchDeck) {
      window.location.replace(pitchDeck);
    }
  }, [game]);

  return (
    <>
      <Seo />
      <Header />
      <section className="p-game-details">
        <header>
          <h1>{game.name} PitchDeck</h1>
        </header>
        <Box>
          <Markdown>{`Redirecting to [${pitchDeck}](${pitchDeck}) ...`}</Markdown>
        </Box>
      </section>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const games = await getGames();

  const paths = games.map((item) => {
    return {
      params: {
        slug: item.slug,
      },
    };
  });

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const slug = routeSlug(context.params?.slug);
  const games = await getGames();
  const game = games.find((item) => item.slug === slug);

  if (game == null) {
    return { notFound: true };
  }

  return {
    props: { game },
  };
};

export default PitchDeck;
