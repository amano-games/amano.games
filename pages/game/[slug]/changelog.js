/* eslint filenames/match-exported: 0 */
import PropTypes from 'prop-types';

import { getChangelog, getGames } from 'utils/notion';
import { url } from 'lib/site';

import Seo from 'components/seo';
import Header from 'components/header';
import Markdown from 'components/markdown';

import styles from './game-changelog.module.css';

function GameDetails({ game, changelog }) {
  const changelogText = changelog ? changelog.join('\n\n') : null;

  return (
    <>
      <Seo
        title={`${game.name} | Changelog`}
        description={game.description}
        image={`${url}/${game.slug}.png`}
      />
      <Header />
      <section className={styles['game-changelog-wrapper']}>
        <header className={styles['game-changelog-header']}>
          <div className={`${styles['game-changelog-header-wrapper']} wrapper`}>
            <h1>{game.name}</h1>
            <h3>Changelog</h3>
          </div>
        </header>
        <div className={`${styles['game-changelog-content']} wrapper`}>
          <img
            className={`${styles['game-changelog-cover']}`}
            src={`/games/${game.slug}.png`}
            alt={game.name}
          />
          {changelogText ? (
            <Markdown className={`${styles['game-changelog-text']} -inverted`}>
              {changelogText}
            </Markdown>
          ) : null}
        </div>
      </section>
    </>
  );
}

GameDetails.propTypes = {
  changelog: PropTypes.arrayOf(PropTypes.string),
  game: PropTypes.shape({
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    badge: PropTypes.string,
    subtitle: PropTypes.string,
    description: PropTypes.string.isRequired,
    className: PropTypes.string,
    trailer: PropTypes.string,
    itch: PropTypes.string,
    newgrounds: PropTypes.string,
    lexaloffle: PropTypes.string,
    featured: PropTypes.bool,
    show_links: PropTypes.bool,
  }),
};

GameDetails.defaultProps = {
  changelog: null,
  game: {},
};

export async function getStaticPaths() {
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
    // { fallback: false } means other routes should 404
    fallback: 'blocking',
  };
}

export async function getStaticProps(context) {
  const { slug } = context.params;
  const changelog = await getChangelog(slug);
  const games = await getGames();
  const game = games.find((item) => item.slug === slug);

  return {
    props: { game, changelog },
  };
}

export default GameDetails;
