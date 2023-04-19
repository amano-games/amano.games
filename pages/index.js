/* eslint filenames/match-exported: 0 */
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Client } from '@notionhq/client';
import Link from 'next/link';

import Seo from 'components/seo';
import Header from 'components/header';
import Footer from 'components/footer';
import Social from 'components/social';

import FakeScene from 'components/fake-scene';
import Scene from 'components/scene';

import GameGallery from 'components/game-gallery';
import AboutUs from 'components/about-us';
import Contact from 'components/contact';

import { parseManitas, parseGames, parseAobutUs } from 'utils/notion';

import usePrefersReducedMotion from 'hooks/use-prefers-reduced-motion';
import { detectWebGLContext } from 'utils/animation';

import styles from './style.module.css';

export default function Home({ manitas, games, aboutUs }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    const webglEnabled = detectWebGLContext();
    setCanRender(!prefersReducedMotion && webglEnabled);
  }, [prefersReducedMotion]);

  return (
    <>
      <Seo />
      <Header />
      <div className={styles['hero-wrapper']} id="home">
        {canRender ? <Scene /> : <FakeScene />}
        <div className={styles['home-info-wrapper']}>
          <div className={styles['home-info']}>
            <p>Two friends</p>
            <p>
              Making{' '}
              <Link href="/#games">
                <a>games</a>
              </Link>
            </p>
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
          aboutUs={parseAobutUs(aboutUs)}
        />
        <Contact className={styles['home-section']} />
      </main>
      <Footer showSocial={false} />
    </>
  );
}

Home.propTypes = {
  manitas: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  games: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  aboutUs: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export async function getStaticProps() {
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

  const pageIdAboutUs = '16545b37f4e642a7a4687a2b5e0b9d85';
  const aboutUsData = await notion.blocks.children.list({
    block_id: pageIdAboutUs,
    page_size: 50,
  });

  const { results: aboutUs } = aboutUsData;

  return {
    props: { manitas, games, aboutUs },
  };
}
