import PropTypes from 'prop-types';

import { getAboutUs, getGames } from 'utils/notion';
import { presskitBySlugGet, presskitsAllGet } from 'lib/api';
import { getImageMeta } from 'lib/img';
import { url } from 'lib/site';

import Seo from 'components/seo';
import Header from 'components/header';
import { PresskitAssets, PresskitInfo } from 'components/presskit';
import Footer from 'components/footer';

import styles from './presskit.module.css';

function PresskitPage({ presskit, game, aboutUs }) {
  return (
    <>
      <Seo />
      <Header
        image={presskit.cover ? presskit.cover.url : `${url}/preview.png`}
      />
      <header className={styles['presskit-header']}>
        <div className={`${styles['presskit-header-wrapper']} wrapper`}>
          {presskit.cover ? (
            <img
              className={`${styles['presskit-cover']}`}
              src={presskit.cover.url}
              alt={game.name}
            />
          ) : null}
        </div>
      </header>
      <div className={`${styles['presskit-wrapper']} wrapper`}>
        <PresskitInfo {...presskit} title={game.name} aboutDev={aboutUs[0]} />
        <PresskitAssets
          videos={presskit.videos}
          images={presskit.images}
          bundle={presskit.assets_bundle}
        />
      </div>
      <Footer showSocial />
    </>
  );
}

PresskitPage.propTypes = {
  aboutUs: PropTypes.arrayOf(PropTypes.string).isRequired,
  presskit: PropTypes.shape({
    cover: PropTypes.shape({
      url: PropTypes.string,
    }),
    genre: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    platforms: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
      })
    ).isRequired,
    releases: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })
    ).isRequired,
    rating: PropTypes.string,
    playersNum: PropTypes.string,
    tagline: PropTypes.string.isRequired,
    legalLine: PropTypes.string,
    website: PropTypes.string,
    bsky: PropTypes.string,
    twitter: PropTypes.string,
    youtube: PropTypes.string,
    assets_bundle: PropTypes.string,
    videos: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        youtube: PropTypes.string,
      })
    ),
    images: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        items: PropTypes.arrayOf(
          PropTypes.shape({
            name: PropTypes.string.isRequired,
            collpase: PropTypes.boolean,
            url: PropTypes.string.isRequired,
          })
        ),
      })
    ),
  }).isRequired,
  game: PropTypes.shape({
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    badge: PropTypes.string,
    subtitle: PropTypes.string,
    description: PropTypes.string.isRequired,
    className: PropTypes.string,
    trailer: PropTypes.string,
    itch: PropTypes.string,
    newgrounds: PropTypes.string,
    lexaloffle: PropTypes.string,
    featured: PropTypes.bool,
    show_links: PropTypes.bool,
    wishlist: PropTypes.string,
  }).isRequired,
};

export async function getStaticPaths() {
  const paths = presskitsAllGet(['slug']).map(({ slug }) => ({
    params: { slug },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps(context) {
  const { slug } = context.params;
  try {
    const games = await getGames();
    const game = games.find((item) => item.slug === slug);
    const aboutUs = await getAboutUs();
    const presskit = presskitBySlugGet(context.params.slug, [
      'slug',
      'content',
      'genre',
      'platforms',
      'releases',
      'playersNum',
      'tagline',
      'website',
      'images',
      'videos',
      'cover',
      'assets_bundle',
    ]);

    if (presskit.images) {
      const groups = presskit.images;
      const enrichedGroups = await Promise.all(
        groups.map(async (group) => {
          const enrichedItems = await Promise.all(
            group.items.map(async (img) => {
              try {
                const meta = await getImageMeta(img.url);
                return {
                  ...img,
                  ...meta,
                };
              } catch (err) {
                return {
                  ...img,
                  error: err,
                };
              }
            })
          );

          return {
            ...group,
            items: enrichedItems,
          };
        })
      );

      presskit.images = enrichedGroups;
    }

    return {
      props: { game, presskit, aboutUs },
    };
  } catch (e) {
    if (e.code === 'ENOENT') {
      return {
        notFound: true,
      };
    }
    throw e;
  }
}

export default PresskitPage;
