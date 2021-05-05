/* eslint filenames/match-exported: 0 */

import Seo from 'components/seo';
import Scene from 'components/scene';
import Header from 'components/header';
import GameGallery from 'components/game-gallery';
import AboutUs from 'components/about-us';

import styles from './style.module.css';

export default function Home() {
  return (
    <>
      <Seo />
      <Header />
      <div className={styles['hero-wrapper']}>
        <Scene />
      </div>
      <main className={styles['home-wrapper']}>
        <GameGallery />
        <AboutUs />
        <div
          style={{ width: '100%', height: '100vh', background: 'var(--bg)' }}
        />
      </main>
    </>
  );
}
