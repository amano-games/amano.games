/* eslint filenames/match-exported: 0 */

import { useRouter } from 'next/router';

import Seo from 'components/seo';
import Header from 'components/header';

import styles from './game-details.module.css';

export default function GameDetails() {
  const router = useRouter();
  const gameSlug = router.query['game-slug'];

  return (
    <>
      <Seo />
      <Header />
      <section className={styles['game-details-wrapper']}>
        <header>
          <h1>{gameSlug} Wishlist</h1>
        </header>
      </section>
    </>
  );
}
