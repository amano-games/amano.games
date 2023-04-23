import PropTypes from 'prop-types';
import { useEffect } from 'react';

import { getGames } from 'utils/notion';

import Seo from 'components/seo';
import Header from 'components/header';
import Box from 'components/box';
import Markdown from 'components/markdown';

import styles from './game-details.module.css';

function PitchDeck({ game }) {
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
      <section className={styles['game-details-wrapper']}>
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

PitchDeck.propTypes = {
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
    wishlist: PropTypes.string,
    pitch_deck: PropTypes.string,
  }).isRequired,
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
  const games = await getGames();
  const game = games.find((item) => item.slug === slug);

  return {
    props: { game },
  };
}

export default PitchDeck;
