import PropTypes from 'prop-types';

import Link from 'next/link';
import Markdown from 'components/markdown';
import PostPreview from 'components/post-preview';

import { twitter } from 'lib/site';
import style from './style.module.css';

const info = `You can subscribe via [RSS](/rss/feed.xml) or follow us [@${twitter}
          ](https://twitter.com/${twitter})`;

function DevlogOtherPosts({ allPosts, currentSlug }) {
  const other = allPosts.filter(
    (post) => post.slug !== currentSlug && post.publish
  );
  return (
    <div className={`${style['devlog-keep-reading-wrapper']} wrapper`}>
      <div className={`${style['devlog-keep-reading']}`}>
        <header className={`${style['devlog-keep-reading-header']}`}>
          <h1 className={style['devlog-keep-reading-title']}>Other Posts</h1>
          <Link
            className={style['devlog-keep-reading-archive']}
            href="/devlog/archive"
          >
            Archive
          </Link>
        </header>
        <Markdown className={`${style['devlog-keep-reading-info']} -inverted`}>
          {info}
        </Markdown>
      </div>

      <div className={`${style['devlog-posts-grid']} wrapper`}>
        {other.map((item) => {
          return <PostPreview {...item} key={item.slug} />;
        })}
      </div>
    </div>
  );
}

DevlogOtherPosts.propTypes = {
  currentSlug: PropTypes.string,
  allPosts: PropTypes.arrayOf(PropTypes.shape({})),
};

DevlogOtherPosts.defaultProps = {
  allPosts: [],
  currentSlug: null,
};

export default DevlogOtherPosts;
