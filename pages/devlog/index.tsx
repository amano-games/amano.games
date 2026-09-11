import type { GetStaticProps } from 'next';

import { postsAllGet } from 'lib/api';
import { generateRssFeed } from 'lib/rss';
import { url } from 'lib/site';
import type { Post } from 'types/post';

import PostView from 'components/post';
import { LayoutDevlog } from 'components/layouts';
import Seo from 'components/seo';
import DevlogOtherPosts from 'components/devlog-other-posts';
import DevlogComments from 'components/devlog-comments';

import style from './style.module.css';

type Props = {
  allPosts: Post[];
};

function Devlog({ allPosts = [] }: Props) {
  const [first] = allPosts;
  return (
    <LayoutDevlog>
      <Seo title="AMANO Devlog" image={`${url}/devlog-preview.png`} />
      <div className={`${style['devlog-single-post']} wrapper`}>
        <PostView {...first} />
      </div>

      {first.mastodon ? <DevlogComments {...first.mastodon} /> : null}
      <DevlogOtherPosts allPosts={allPosts} currentSlug={first.slug} />
    </LayoutDevlog>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
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

  return {
    props: { allPosts },
  };
};

export default Devlog;
