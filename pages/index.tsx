import { useState, useEffect } from 'react';
import Link from 'next/link';
import type { GetStaticProps } from 'next';

import Seo from 'components/seo';
import Header from 'components/header';
import Footer from 'components/footer';
import Social from 'components/social';

import FakeScene from 'components/fake-scene';
import Scene from 'components/scene';

import GameGallery from 'components/game-gallery';
import AboutUs from 'components/about-us';
import Contact from 'components/contact';
import NewsletterSignupForm from 'components/newsletter-signup-form';

import { getManitas, getGames, getAboutUs } from 'utils/notion';
import type { Game } from 'types/game';
import type { Manita } from 'types/manita';

import usePrefersReducedMotion from 'hooks/use-prefers-reduced-motion';
import { detectWebGLContext } from 'utils/animation';

import styles from './style.module.css';

type Props = {
  manitas: Manita[];
  games: Game[];
  aboutUs: string[];
};

export default function Home({ manitas, games, aboutUs }: Props) {
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
          <div className={styles['home-newsletter-wrapper']}>
            <NewsletterSignupForm className={styles['home-newsletter-form']} />
            <div className={styles['home-newsletter-info']}>
              <p>
                Subscribe to our <Link href="/newsletter">newsletter</Link> and
                get one email whenever we do something important, which tends to
                happend at most twice a year.
              </p>
            </div>
          </div>
        </div>
      </div>
      <main className={styles['home-wrapper']}>
        <GameGallery
          id="games"
          games={games}
          className={`${styles['home-section']} ${styles['games-section']} -inverted`}
        />
        <AboutUs manitas={manitas} aboutUs={aboutUs[0]} />
        <Contact />
      </main>
      <Footer showSocial={false} />
    </>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const [manitas, games, aboutUs] = await Promise.all([
    getManitas(),
    getGames(),
    getAboutUs(),
  ]);

  return {
    props: { manitas, games, aboutUs },
  };
};
