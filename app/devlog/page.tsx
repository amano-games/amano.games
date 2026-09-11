import { postsAllGet } from 'lib/api';
import { generateRssFeed } from 'lib/rss';
import { url } from 'lib/site';
import { createMetadata } from 'lib/metadata';

import PostView from 'components/post';
import DevlogOtherPosts from 'components/devlog-other-posts';
import DevlogComments from 'components/devlog-comments';

import './styles.css';

export const dynamic = 'force-static';

export const metadata = createMetadata({
  title: 'AMANO Devlog',
  image: `${url}/devlog-preview.png`,
  path: '/devlog',
});

export default async function Devlog() {
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

  await generateRssFeed(allPosts);

  const [first] = allPosts;

  return (
    <>
      <div className="p-devlog wrapper">
        <PostView {...first} />
      </div>

      {first.mastodon ? <DevlogComments {...first.mastodon} /> : null}
      <DevlogOtherPosts allPosts={allPosts} currentSlug={first.slug} />
    </>
  );
}
