import type { GetStaticPaths, GetStaticProps } from 'next';

import { getAboutUs, getGames } from 'utils/notion';
import {
  presskitBySlugGet,
  presskitsAllGet,
  isEnoent,
  routeSlug,
} from 'lib/api';
import { getImageMeta, getAssetMeta } from 'lib/assets';
import type { Game } from 'types/game';
import type { Presskit } from 'types/presskit';

import Seo from 'components/seo';
import Header from 'components/header';
import { PresskitAssets, PresskitInfo } from 'components/presskit';
import Footer from 'components/footer';

type Props = {
  presskit: Presskit;
  game: Game;
  aboutUs: string[];
};

function PresskitPage({ presskit, game, aboutUs }: Props) {
  return (
    <>
      <Seo title={`Presskit ${game.name}`} />
      <Header />
      <header className="p-presskit-header">
        <div className="p-presskit-header-wrapper wrapper">
          {presskit.cover ? (
            <img
              className="p-presskit-cover"
              src={presskit.cover.url}
              alt={game.name}
            />
          ) : null}
        </div>
      </header>
      <div className="p-presskit-wrapper wrapper">
        <PresskitInfo {...presskit} title={game.name} aboutDev={aboutUs[0]} />
        <PresskitAssets
          videos={presskit.videos}
          assets={presskit.assets}
          bundle={presskit.assets_bundle}
        />
      </div>
      <Footer showSocial />
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = presskitsAllGet(['slug']).map(({ slug }) => ({
    params: { slug },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const slug = routeSlug(context.params?.slug);
  if (slug == null) {
    return { notFound: true };
  }

  try {
    const games = await getGames();
    const game = games.find((item) => item.slug === slug);
    if (game == null) {
      return { notFound: true };
    }

    const aboutUs = await getAboutUs();
    const presskit: Presskit = presskitBySlugGet(slug, [
      'slug',
      'content',
      'genre',
      'platforms',
      'releases',
      'playersNum',
      'tagline',
      'website',
      'assets',
      'videos',
      'cover',
      'assets_bundle',
    ]);

    if (presskit.assets) {
      const groups = presskit.assets;
      const enrichedGroups = await Promise.all(
        groups.map(async (group) => {
          const enrichedItems = await Promise.all(
            group.items.map(async (asset) => {
              try {
                const meta = await getImageMeta(asset.url);
                return {
                  ...asset,
                  ...meta,
                };
              } catch (err) {
                console.error(err);
                return {
                  ...asset,
                  error: err instanceof Error ? err.message : String(err),
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

      presskit.assets = enrichedGroups;
    }

    if (presskit.videos) {
      const { videos } = presskit;
      const enrichedVideos = await Promise.all(
        videos.map(async (video) => {
          const enrichedDownloads = await Promise.all(
            (video.downloads || []).map(async (asset) => {
              try {
                const meta = await getAssetMeta(asset.url);
                return {
                  ...asset,
                  ...meta,
                };
              } catch (err) {
                console.error(err);
                return {
                  ...asset,
                  error: err instanceof Error ? err.message : String(err),
                };
              }
            })
          );

          return {
            ...video,
            downloads: enrichedDownloads,
          };
        })
      );

      presskit.videos = enrichedVideos;
    }

    return {
      props: { game, presskit, aboutUs },
    };
  } catch (e) {
    if (isEnoent(e)) {
      return {
        notFound: true,
      };
    }
    throw e;
  }
};

export default PresskitPage;
