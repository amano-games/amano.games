import type { GetStaticPaths, GetStaticProps } from 'next';

import { getGames } from 'utils/notion';
import { url } from 'lib/site';
import { routeSlug } from 'lib/api';
import type { Game } from 'types/game';

import Seo from 'components/seo';
import Header from 'components/header';
import Box from 'components/box';
import Markdown from 'components/markdown';

type Props = {
  game: Game;
};

function GameDetails({ game }: Props) {
  return (
    <>
      <Seo
        title={game.name}
        description={game.description}
        image={`${url}/${game.slug}.png`}
      />
      <Header />
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

export default GameDetails;
