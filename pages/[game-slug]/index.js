/* eslint filenames/match-exported: 0 */
import PropTypes from 'prop-types';

import { getGames } from 'utils/notion';
import { url } from 'lib/site';

import Seo from 'components/seo';
import Header from 'components/header';
import Box from 'components/box';
import Markdown from 'components/markdown';

import styles from './game-details.module.css';

function GameDetails({ game }) {
  return (
    <>
      <Seo
        title={game.name}
        description={game.description}
        image={`${url}/${game.slug}.png`}
      />
      <Header />
      <section className={styles['game-details-wrapper']}>
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

GameDetails.propTypes = {
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
  game: {},
};

export async function getStaticPaths() {
  const games = await getGames();

  const paths = games.map((item) => {
    return {
      params: {
        'game-slug': item.slug,
      },
    };
  });

  return {
    paths,
    // { fallback: false } means other routes should 404
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const slug = context.params['game-slug'];
  const games = await getGames();
  const game = games.find((item) => item.slug === slug);

  return {
    props: { game },
  };
}

export default GameDetails;
