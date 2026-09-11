import { notFound } from 'next/navigation';

import { getAboutUs } from 'utils/notion';
import { presskitBySlugGet, isEnoent } from 'lib/api';
import { getImageMeta, getAssetMeta } from 'lib/assets';
import { createMetadata } from 'lib/metadata';
import { gameBySlug } from 'lib/game';
import type { Presskit } from 'types/presskit';

import { PresskitAssets, PresskitInfo } from 'components/presskit';
import Footer from 'components/footer';

import './styles.css';

export const dynamic = 'force-static';

type Props = {
  params: Promise<{ slug: string }>;
};

const presskitFields = [
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
] as const;

async function enrichPresskit(presskit: Presskit): Promise<Presskit> {
  let { assets } = presskit;
  let { videos } = presskit;

  if (assets) {
    assets = await Promise.all(
      assets.map(async (group) => {
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
  }

  if (videos) {
    videos = await Promise.all(
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
  }

  return {
    ...presskit,
    assets,
    videos,
  };
}

async function presskitBySlug(slug: string) {
  try {
    const presskit = presskitBySlugGet(slug, [...presskitFields]);
    return enrichPresskit(presskit);
  } catch (e) {
    if (isEnoent(e)) {
      notFound();
    }
    throw e;
  }
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const game = await gameBySlug(slug);

  return createMetadata({
    title: `Presskit ${game.name}`,
    path: `/game/${slug}/presskit`,
  });
}

export default async function PresskitPage({ params }: Props) {
  const { slug } = await params;
  const [game, aboutUs, presskit] = await Promise.all([
    gameBySlug(slug),
    getAboutUs(),
    presskitBySlug(slug),
  ]);

  return (
    <>
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
