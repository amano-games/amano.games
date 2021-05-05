/* eslint filenames/match-exported: 0 */

import Seo from 'components/seo';
import Scene from 'components/scene';
import Header from 'components/header';
import Footer from 'components/footer';

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
      </div>
      <main className={styles['home-wrapper']}>
        <GameGallery />
        <AboutUs />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
