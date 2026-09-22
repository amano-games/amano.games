import { Feed } from 'feed';
import fs from 'fs';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';

import {
  url,
  defaultTitle,
  defaultDescription,
  twitter,
  email,
} from 'lib/site';
import type { Post } from 'types/post';

const baseUrl = url;
const date = new Date();

export const authorAmano = {
  name: 'Amano',
  email,
  link: `https://twitter.com/${twitter}`,
};

type RssPost = Pick<
  Post,
  'slug' | 'title' | 'excerpt' | 'content' | 'authors' | 'date'
>;

async function markdownToHtml(markdown: string) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(markdown);

  return String(file);
}

export async function generateRssFeed(posts: RssPost[]) {
  if (process.env.NODE_ENV === 'development') {
    return;
  }

  const feed = new Feed({
    title: defaultTitle,
    description: defaultDescription,
    id: baseUrl,
    link: baseUrl,
    language: 'en',
    image: `${baseUrl}/favicon.svg`,
    favicon: `${baseUrl}/favicon.ico`,
    copyright: `All rights reserved ${date.getFullYear()}, Amano Games`,
    updated: date,
    generator: 'Next.js using Feed for Node.js',
    feedLinks: {
      rss2: `${baseUrl}/rss/feed.xml`,
      json: `${baseUrl}/rss/feed.json`,
      atom: `${baseUrl}/rss/atom.xml`,
    },
    author: authorAmano,
  });

  const items = await Promise.all(
    posts.map(async (post) => {
      const slugEncoded = encodeURIComponent(post.slug);
      const postUrl = `${baseUrl}/devlog/${slugEncoded}`;
      const content = await markdownToHtml(post.content ?? '');

      return {
        title: post.title,
        id: postUrl,
        link: postUrl,
        description: post.excerpt,
        content,
        author: post.authors.map((item) => {
          return {
            name: item.name,
            link: item.url,
          };
        }),
        contributor: post.authors.map((item) => {
          return {
            name: item.name,
            link: item.url,
          };
        }),
        date: new Date(post.date),
      };
    })
  );

  items.forEach((item) => {
    feed.addItem(item);
  });

  fs.mkdirSync('./public/rss', { recursive: true });
  fs.writeFileSync('./public/rss/feed.xml', feed.rss2());
  fs.writeFileSync('./public/rss/atom.xml', feed.atom1());
  fs.writeFileSync('./public/rss/feed.json', feed.json1());
}
