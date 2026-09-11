/* eslint filenames/match-exported: 0 */
import type { GetStaticPaths, GetStaticProps } from 'next';

import { postsAllGet, postBySlugGet, isEnoent, routeSlug } from 'lib/api';
import { url } from 'lib/site';
import type { Post } from 'types/post';

import Seo from 'components/seo';
import PostView from 'components/post';
import { LayoutDevlog } from 'components/layouts';
import DevlogOtherPosts from 'components/devlog-other-posts';
import DevlogComments from 'components/devlog-comments';

import style from './style.module.css';

type Props = {
  post: Post;
  allPosts: Post[];
};

function SinglePost({ post, allPosts = [] }: Props) {
  return (
    <LayoutDevlog>
      <Seo
        title={post.title}
        image={post.cover ? post.cover.url : `${url}/devlog-preview.png`}
        description={post.excerpt}
        authors={post.authors}
      />
      <div className={`${style['single-post-wrapper']} wrapper`}>
        <PostView {...post} />
      </div>
      {post.mastodon ? <DevlogComments {...post.mastodon} /> : null}
      <DevlogOtherPosts allPosts={allPosts} currentSlug={post.slug} />
    </LayoutDevlog>
  );
}

export default SinglePost;

export const getStaticProps: GetStaticProps<Props> = async (context) => {
  const slug = routeSlug(context.params?.slug);
  if (slug == null) {
    return { notFound: true };
  }

  try {
    const allPosts = postsAllGet([
      'publish',
      'title',
      'date',
      'slug',
      'authors',
      'excerpt',
      'tags',
      'cover',
    ]);
    const post = postBySlugGet(slug, [
      'slug',
      'title',
      'date',
      'authors',
      'excerpt',
      'content',
      'tags',
      'cover',
      'mastodon',
    ]);

    return {
      props: { post, allPosts },
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

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = postsAllGet(['slug']).map(({ slug }) => ({
    params: { slug },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};
