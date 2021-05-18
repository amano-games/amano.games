/* eslint filenames/match-exported: 0 */
import PropTypes from 'prop-types';
import { Client } from '@notionhq/client';

import Seo from 'components/seo';
import Scene from 'components/scene';
import Header from 'components/header';
import Footer from 'components/footer';
import Box from 'components/box';
import Social from 'components/social';

import GameGallery from 'components/game-gallery';
import AboutUs from 'components/about-us';
import Contact from 'components/contact';

import { parseManitas, parseGames } from 'utils/notion';

import styles from './style.module.css';

export default function Home({ manitas, games }) {
  return (
    <>
      <Seo />
      <Header />
      <div className={styles['hero-wrapper']}>
        <Scene />
        <div className={styles['home-info-wrapper']}>
          <Box className={styles['home-info']}>
            <p>Two friends</p>
            <p>Making games</p>
            <p>By Hand</p>
          </Box>

          <Social className={styles['home-social']} />
        </div>
      </div>
      <main className={styles['home-wrapper']}>
        <GameGallery
          games={parseGames(games)}
          className={`${styles['home-section']} ${styles['games-section']} -inverted`}
        />
        <AboutUs
          className={styles['home-section']}
          manitas={parseManitas(manitas)}
        />
        <Contact className={styles['home-section']} />
      </main>
      <Footer />
    </>
  );
}

Home.propTypes = {
  manitas: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  games: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export async function getServerSideProps() {
  const notion = new Client({
    auth: process.env.NOTION_SECRET,
  });

  const manitasData = await notion.databases.query({
    database_id: 'db6aafe3a3c644d3a84a59657f82436a',
  });

  const { results: manitas } = manitasData;

  const gamesData = await notion.databases.query({
    database_id: '89794766645149c2a79bb64a72c75d1b',
  });

  const { results: games } = gamesData;

  return {
    props: { manitas, games },
  };
}
