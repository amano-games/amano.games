import PropTypes from 'prop-types';

import { getAllPosts } from 'lib/api';
import { generateRssFeed } from 'lib/rss';

import Post from 'components/post';
import { LayoutDevlog } from 'components/layouts';
import Seo from 'components/seo';
import PostPreview from 'components/post-preview';

import style from './style.module.css';

function Devlog({ allPosts }) {
  const [first, ...rest] = allPosts;
  return (
    <LayoutDevlog>
      <Seo title="AMANO Devlog" image="/devlog-preview.png" />
      <div className={`${style['devlog-single-post']} wrapper`}>
        <Post {...first} />
      </div>

      <div className="wrapper">
        <h1 className={style['devlog-keep-reading']}>Other Posts</h1>
      </div>
      <div className={`${style['devlog-posts-grid']} wrapper`}>
        {rest.map((item) => {
          return <PostPreview {...item} key={item.slug} />;
        })}
      </div>
    </LayoutDevlog>
  );
}

Devlog.propTypes = {
  allPosts: PropTypes.arrayOf(PropTypes.shape({})),
};

Devlog.defaultProps = {
  allPosts: [],
};

export async function getStaticProps() {
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'excerpt',
    'tags',
    'cover',
    'content',
  ]);

  await generateRssFeed(allPosts);

  return {
    props: { allPosts },
  };
}

export default Devlog;
