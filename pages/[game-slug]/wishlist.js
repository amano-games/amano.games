import { useRouter } from 'next/router';

import { getGames } from 'utils/notion';

import Seo from 'components/seo';
import Header from 'components/header';

import styles from './game-details.module.css';

function Wishlist() {
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

export async function getStaticPaths() {
  const games = await getGames();

  const paths = games.map((item) => {
    return {
      params: {
        'game-slug': item.slug,
      },
    };
  });

  return {
    paths,
    fallback: false, // can also be true or 'blocking'
  };
}

export async function getStaticProps(context) {
  const slug = context.params['game-slug'];
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
