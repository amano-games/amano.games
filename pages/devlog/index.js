import PropTypes from 'prop-types';

import { getAllPosts } from 'lib/api';
import { generateRssFeed } from 'lib/rss';
import { url } from 'lib/site';

import Post from 'components/post';
import { LayoutDevlog } from 'components/layouts';
import Seo from 'components/seo';
import DevlogOtherPosts from 'components/devlog-other-posts';
import DevlogComments from 'components/devlog-comments';

import style from './style.module.css';

function Devlog({ allPosts }) {
  const [first] = allPosts;
  return (
    <LayoutDevlog>
      <Seo title="AMANO Devlog" image={`${url}/devlog-preview.png`} />
      <div className={`${style['devlog-single-post']} wrapper`}>
        <Post {...first} />
      </div>

      {first.mastodon ? <DevlogComments {...first.mastodon} /> : null}
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
    'mastodon',
  ]).filter((item) => item.publish);

  await generateRssFeed(allPosts);

  return {
    props: { allPosts },
  };
}

export default Devlog;
