import { useRouter } from 'next/router';

import { getGames } from 'utils/notion';

import Seo from 'components/seo';
import Header from 'components/header';

import styles from './game-details.module.css';

function Wishlist() {
  const router = useRouter();
  const gameSlug = router.query.slug;

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

export async function getServerSideProps(context) {
  const { slug } = context.params;
  const games = await getGames();
  const game = games.find((item) => item.slug === slug);

  if (game.wishlist) {
    return {
      redirect: {
        destination: game.wishlist,
      },
    };
  }

  return {
    props: { game },
  };
}

export default Wishlist;
