/* eslint filenames/match-exported: 0 */
import PropTypes from 'prop-types';

import { getAllPosts, getPostBySlug } from 'lib/api';
import { url } from 'lib/site';

import Seo from 'components/seo';
import Post from 'components/post';
import { LayoutDevlog } from 'components/layouts';
import DevlogOtherPosts from 'components/devlog-other-posts';

import style from './style.module.css';

function SinglePost({ post, allPosts }) {
  return (
    <LayoutDevlog>
      <Seo
        title={post.title}
        image={post.cover ? post.cover.url : `${url}/devlog-preview.png`}
        description={post.excerpt}
      />
      <div className={`${style['single-post-wrapper']} wrapper`}>
        <Post {...post} />
      </div>
      <DevlogOtherPosts allPosts={allPosts} currentSlug={post.slug} />
    </LayoutDevlog>
  );
}

export default SinglePost;

SinglePost.propTypes = {
  post: PropTypes.shape({
    slug: PropTypes.string,
    title: PropTypes.string,
    excerpt: PropTypes.string,
    cover: PropTypes.shape({
      url: PropTypes.string,
    }),
  }).isRequired,
  allPosts: PropTypes.arrayOf(PropTypes.shape({})),
};

SinglePost.defaultProps = {
  allPosts: [],
};

export async function getStaticProps(context) {
  const allPosts = getAllPosts([
    'publish',
    'title',
    'date',
    'slug',
    'author',
    'excerpt',
    'tags',
    'cover',
  ]);
  const post = getPostBySlug(context.params.slug, [
    'slug',
    'title',
    'date',
    'author',
    'excerpt',
    'content',
    'tags',
    'cover',
  ]);

  return {
    props: { post, allPosts },
  };
}

export async function getStaticPaths() {
  const paths = getAllPosts(['slug']).map(({ slug }) => ({
    params: { slug },
  }));

  return {
    paths,
    fallback: false,
  };
}
