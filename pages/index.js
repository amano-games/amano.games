/* eslint filenames/match-exported: 0 */
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
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

import { getManitas, getGames, getAboutUs } from 'utils/notion';

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
              Making <Link href="/#games">games</Link>
            </p>
            <p>By Hand</p>
          </div>

          <Social className={styles['home-social']} />
        </div>
      </div>
      <main className={styles['home-wrapper']}>
        <GameGallery
          id="games"
          games={games}
          className={`${styles['home-section']} ${styles['games-section']} -inverted`}
        />
        <AboutUs
          className={styles['home-section']}
          manitas={manitas}
          aboutUs={aboutUs[0]}
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
  aboutUs: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export async function getStaticProps() {
  const [manitas, games, aboutUs] = await Promise.all([
    getManitas(),
    getGames(),
    getAboutUs(),
  ]);

  return {
    props: { manitas, games, aboutUs },
  };
}
