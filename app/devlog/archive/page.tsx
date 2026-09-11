import Link from 'next/link';

import { postsAllGet } from 'lib/api';
import { url } from 'lib/site';
import { createMetadata } from 'lib/metadata';
import type { Post } from 'types/post';

import Box from 'components/box';

import './styles.css';

const options: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
};

const dateFormat = new Intl.DateTimeFormat('en-UK', {
  year: 'numeric',
});

export const dynamic = 'force-static';

export const metadata = createMetadata({
  title: 'AMANO Devlog',
  image: `${url}/devlog-preview.png`,
  path: '/devlog/archive',
});

export default async function Archive() {
  const allPosts = postsAllGet([
    'publish',
    'title',
    'date',
    'slug',
    'authors',
    'excerpt',
    'tags',
    'cover',
    'content',
    'mastodon',
  ]).filter((item) => item.publish);

  const list = allPosts.reduce<Record<string, Post[]>>((acc, item) => {
    const key = dateFormat.format(Date.parse(item.date));
    const group = acc[key] || [];
    group.push(item);
    acc[key] = group;
    return acc;
  }, {});

  return (
    <div className="p-devlog-archive wrapper -inverted">
      <header className="p-devlog-archive-header">
        <h1 className="p-devlog-archive-header-title">Archive</h1>
      </header>
      <Box inverted>
        {[...Object.entries(list)].reverse().map(([key, value]) => {
          return (
            <section key={key}>
              <header className="p-devlog-archive-section-header">
                <h3>{key}</h3>
              </header>
              <ol className="p-devlog-archive-list">
                {value.map((item) => {
                  const datePosted = new Date(item.date);
                  const dateParsed = datePosted.toLocaleDateString(
                    undefined,
                    options
                  );
                  const tagsArr = item.tags?.split(',') ?? [];
                  const slugEncoded = encodeURIComponent(item.slug);
                  return (
                    <li key={item.slug} className="p-devlog-archive-list-item">
                      <Link
                        href={`/devlog/${slugEncoded}`}
                        className="p-devlog-archive-list-item-inner"
                      >
                        <span
                          className="p-devlog-archive-post-date"
                          data-hide="mobile"
                        >
                          <time>{dateParsed}</time>
                        </span>
                        <span>{item.title}</span>
                      </Link>
                      {tagsArr.length > 0 ? (
                        <div
                          className="p-devlog-archive-post-tags"
                          data-hide="mobile"
                        >
                          {tagsArr.map((tag) => {
                            return <span key={tag}>#{tag}</span>;
                          })}
                        </div>
                      ) : null}
                    </li>
                  );
                })}
              </ol>
            </section>
          );
        })}
      </Box>
    </div>
  );
}
