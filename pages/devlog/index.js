import PropTypes from 'prop-types';

import { getAllPosts } from 'lib/api';
import { generateRssFeed } from 'lib/rss';
import { url } from 'lib/site';

import Post from 'components/post';
import { LayoutDevlog } from 'components/layouts';
import Seo from 'components/seo';
import DevlogOtherPosts from 'components/devlog-other-posts';

import style from './style.module.css';

function Devlog({ allPosts }) {
  const [first] = allPosts.filter((item) => item.publish);
  return (
    <LayoutDevlog>
      <Seo title="AMANO Devlog" image={`${url}/devlog-preview.png`} />
      <div className={`${style['devlog-single-post']} wrapper`}>
        <Post {...first} />
      </div>

      <DevlogOtherPosts allPosts={allPosts} currentSlug={first.slug} />
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
    'publish',
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
