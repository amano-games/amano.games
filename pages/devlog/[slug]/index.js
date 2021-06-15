/* eslint filenames/match-exported: 0 */
import PropTypes from 'prop-types';

import { getAllPosts, getPostBySlug } from 'lib/api';

import Seo from 'components/seo';
import Post from 'components/post';
import { LayoutDevlog } from 'components/layouts';

import style from './style.module.css';

function SinglePost({ post }) {
  return (
    <LayoutDevlog>
      <Seo
        title={post.title}
        image={post.cover ? post.cover.url : '/devlog-preview.png'}
        description={post.excerpt}
      />
      <div className={`${style['single-post-wrapper']} wrapper`}>
        <Post {...post} />
      </div>
    </LayoutDevlog>
  );
}

export default SinglePost;

SinglePost.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string,
    excerpt: PropTypes.string,
    cover: PropTypes.shape({
      url: PropTypes.string,
    }),
  }).isRequired,
};

SinglePost.defaultProps = {};

export async function getStaticProps(context) {
  const post = getPostBySlug(context.params.slug, [
    'title',
    'date',
    'slug',
    'author',
    'excerpt',
    'content',
    'tags',
    'cover',
  ]);

  return {
    props: { post },
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
