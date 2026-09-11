import Link from 'next/link';

import Header from 'components/header';
import Footer from 'components/footer';
import Social from 'components/social';
import HomeHero from 'components/home-hero';
import GameGallery from 'components/game-gallery';
import AboutUs from 'components/about-us';
import Contact from 'components/contact';
import NewsletterSignupForm from 'components/newsletter-signup-form';

import { getManitas, getGames, getAboutUs } from 'utils/notion';
import { createMetadata } from 'lib/metadata';

import './styles.css';

export const dynamic = 'force-static';

export const metadata = createMetadata({ path: '/' });

export default async function Home() {
  const [manitas, games, aboutUs] = await Promise.all([
    getManitas(),
    getGames(),
    getAboutUs(),
  ]);

  return (
    <>
      <Header />
      <div className="p-home-hero-wrapper" id="home">
        <HomeHero />
        <div className="p-home-info-wrapper">
          <div className="p-home-info">
            <p>Two friends</p>
            <p>
              Making <Link href="/#games">games</Link>
            </p>
            <p>By Hand</p>
          </div>

          <Social className="p-home-social" />
          <div className="p-home-newsletter-wrapper">
            <NewsletterSignupForm className="p-home-newsletter-form" />
            <div className="p-home-newsletter-info">
              <p>
                Subscribe to our <Link href="/newsletter">newsletter</Link> and
                get one email whenever we do something important, which tends to
                happend at most twice a year.
              </p>
            </div>
          </div>
        </div>
      </div>
      <main className="p-home-wrapper">
        <GameGallery
          id="games"
          games={games}
          className="p-home-section p-home-games-section -inverted"
        />
        <AboutUs manitas={manitas} aboutUs={aboutUs[0]} />
        <Contact />
      </main>
      <Footer showSocial={false} />
    </>
  );
}
