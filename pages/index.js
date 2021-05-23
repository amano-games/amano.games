/* eslint filenames/match-exported: 0 */
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Client } from '@notionhq/client';

import Seo from 'components/seo';
import Header from 'components/header';
import Footer from 'components/footer';
import Social from 'components/social';

import FakeScene from 'components/fake-scene';
import Scene from 'components/scene';

import GameGallery from 'components/game-gallery';
import AboutUs from 'components/about-us';
import Contact from 'components/contact';

import { parseManitas, parseGames } from 'utils/notion';

import styles from './style.module.css';

export default function Home({ manitas, games }) {
  const [jsEnabled, setJsEnabled] = useState(false);
  useEffect(() => {
    setJsEnabled(true);
  }, []);

  return (
    <>
      <Seo />
      <Header />
      <div className={styles['hero-wrapper']} id="home">
        {jsEnabled ? <Scene /> : <FakeScene />}
        <div className={styles['home-info-wrapper']}>
          <div className={styles['home-info']}>
            <p>Two friends</p>
            <p>Making games</p>
            <p>By Hand</p>
          </div>

          <Social className={styles['home-social']} />
        </div>
      </div>
      <main className={styles['home-wrapper']}>
        <GameGallery
          id="games"
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
