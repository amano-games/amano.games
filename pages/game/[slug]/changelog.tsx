/* eslint filenames/match-exported: 0 */
import type { GetStaticPaths, GetStaticProps } from 'next';

import { getChangelog, getGames } from 'utils/notion';
import { url } from 'lib/site';
import { routeSlug } from 'lib/api';
import type { Game } from 'types/game';

import Seo from 'components/seo';
import Header from 'components/header';
import Markdown from 'components/markdown';

function toMetaDescription(section: string) {
  return section
    .replace(/[#_*`>-]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

type Props = {
  game: Game;
  changelog: string[] | null;
};

function GameDetails({ game, changelog }: Props) {
  const changelogText = changelog ? changelog.join('\n\n') : null;
  const firstSection = changelogText
    ? toMetaDescription(changelogText.split('\n---\n')[0].trim())
    : null;

  return (
    <>
      <Seo
        title={`${game.name} | Changelog`}
        description={firstSection ?? undefined}
        image={`${url}/games/${game.slug}.png`}
      />
      <Header />
      <section className="p-game-changelog">
        <header className="p-game-changelog-header">
          <div className="p-game-changelog-header-wrapper wrapper">
            <h1>{game.name}</h1>
            <h3>Changelog</h3>
          </div>
        </header>
        <div className="p-game-changelog-content wrapper">
          <img
            className="p-game-changelog-cover"
            src={`/games/${game.slug}.png`}
            alt={game.name}
          />
          {changelogText ? (
            <Markdown className="p-game-changelog-text -inverted">
              {changelogText}
            </Markdown>
          ) : null}
        </div>
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
  if (slug == null) {
    return { notFound: true };
  }

  const changelog = await getChangelog(slug);
  const games = await getGames();
  const game = games.find((item) => item.slug === slug);

  if (game == null) {
    return { notFound: true };
  }

  return {
    props: { game, changelog },
  };
};

export default GameDetails;
