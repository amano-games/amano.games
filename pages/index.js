/* eslint filenames/match-exported: 0 */

import Seo from 'components/seo';
import Scene from 'components/scene';
import Header from 'components/header';
import Footer from 'components/footer';
import Box from 'components/box';
import Social from 'components/social';

import GameGallery from 'components/game-gallery';
import AboutUs from 'components/about-us';
import Contact from 'components/contact';

import styles from './style.module.css';

export default function Home() {
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
          className={`${styles['home-section']} ${styles['games-section']} -inverted`}
        />
        <AboutUs className={styles['home-section']} />
        <Contact className={styles['home-section']} />
      </main>
      <Footer />
    </>
  );
}
