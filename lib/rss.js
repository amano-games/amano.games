import { Feed } from 'feed';
import fs from 'fs';

import { url, defaultTitle, defaultDescription } from 'lib/site';

const baseUrl = url;
const date = new Date();

const author = {
  name: 'Amano',
  email: 'hola@amano.games',
  link: 'twitter.com/amanogames_',
};

export async function generateRssFeed(posts) {
  // if (process.env.NODE_ENV === 'development') {
  //   return;
  // }
  const feed = new Feed({
    title: defaultTitle,
    description: defaultDescription,
    id: baseUrl,
    link: baseUrl,
    language: 'en',
    image: `${baseUrl}/images/logo.svg`,
    favicon: `${baseUrl}/favicon.ico`,
    copyright: `All rights reserved ${date.getFullYear()}, Amano Games`,
    updated: date,
    generator: 'Next.js using Feed for Node.js',
    feedLinks: {
      rss2: `${baseUrl}/rss/feed.xml`,
      json: `${baseUrl}/rss/feed.json`,
      atom: `${baseUrl}/rss/atom.xml`,
    },
    author,
  });

  posts.forEach((post) => {
    const postUrl = `${baseUrl}/devlog/${post.slug}`;
    feed.addItem({
      title: post.title,
      id: postUrl,
      link: postUrl,
      description: post.description,
      content: post.excerpt,
      author: {
        name: post.author.name,
        link: post.author.url,
      },
      contributor: [author],
      date: new Date(post.date),
    });
  });

  fs.mkdirSync('./public/rss', { recursive: true });
  fs.writeFileSync('./public/rss/feed.xml', feed.rss2());
  fs.writeFileSync('./public/rss/atom.xml', feed.atom1());
  fs.writeFileSync('./public/rss/feed.json', feed.json1());
}
