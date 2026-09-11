import type { Metadata } from 'next';

import {
  color,
  defaultDescription,
  defaultImage,
  defaultTitle,
  mastodon,
  twitter,
  url,
} from 'lib/site';
import type { Author } from 'types/post';

const RSS_TITLE = "RSS feed for Amano's devlog";
const RSS_FEED_PATH = '/rss/feed.xml';

export const defaultViewport = {
  themeColor: color,
};

type MetadataInput = {
  title?: string;
  description?: string;
  image?: string;
  authors?: Author[];
  path: string;
};

function fediverseCreators(authors: Author[]) {
  const fromAuthors = authors
    .map((item) => item.mastodon)
    .filter((item): item is string => Boolean(item));

  if (fromAuthors.length > 0) {
    return fromAuthors;
  }

  return [mastodon];
}

export function createMetadata({
  title = defaultTitle,
  description = defaultDescription,
  image = defaultImage,
  authors = [],
  path,
}: MetadataInput): Metadata {
  const canonicalUrl = `${url}${path}`;
  const creators = fediverseCreators(authors);

  return {
    title,
    description,
    metadataBase: new URL(url),
    alternates: {
      canonical: canonicalUrl,
      types: {
        'application/rss+xml': [{ url: RSS_FEED_PATH, title: RSS_TITLE }],
        'application/atom+xml': [{ url: RSS_FEED_PATH, title: RSS_TITLE }],
      },
    },
    icons: {
      icon: [
        { url: '/favicon.ico' },
        { url: '/favicon.svg', type: 'image/svg+xml' },
      ],
    },
    openGraph: {
      title,
      type: 'website',
      url: canonicalUrl,
      images: [image],
      description,
    },
    twitter: {
      card: 'summary_large_image',
      site: `@${twitter}`,
      title,
      description,
      creator: twitter,
    },
    other: {
      'fediverse:creator': creators.length === 1 ? creators[0] : creators,
    },
  };
}
