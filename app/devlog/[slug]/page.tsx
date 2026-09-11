import { notFound } from 'next/navigation';

import { postsAllGet, postBySlugGet, isEnoent } from 'lib/api';
import { url } from 'lib/site';
import { createMetadata } from 'lib/metadata';

import PostView from 'components/post';
import DevlogOtherPosts from 'components/devlog-other-posts';
import DevlogComments from 'components/devlog-comments';

import './styles.css';

export const dynamic = 'force-static';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return postsAllGet(['slug']).map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;

  try {
    const post = postBySlugGet(slug, ['title', 'excerpt', 'cover', 'authors']);

    return createMetadata({
      title: post.title,
      description: post.excerpt,
      image: post.cover ? post.cover.url : `${url}/devlog-preview.png`,
      authors: post.authors,
      path: `/devlog/${slug}`,
    });
  } catch (e) {
    if (isEnoent(e)) {
      notFound();
    }
    throw e;
  }
}

export default async function SinglePost({ params }: Props) {
  const { slug } = await params;

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

    return (
      <>
        <div className="p-devlog-post wrapper">
          <PostView {...post} />
        </div>
        {post.mastodon ? <DevlogComments {...post.mastodon} /> : null}
        <DevlogOtherPosts allPosts={allPosts} currentSlug={post.slug} />
      </>
    );
  } catch (e) {
    if (isEnoent(e)) {
      notFound();
    }
    throw e;
  }
}
