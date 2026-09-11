import Link from 'next/link';
import Markdown from 'components/markdown';
import PostPreview from 'components/post-preview';

import { twitter } from 'lib/site';
import type { Post } from 'types/post';
import './styles.css';

const info = `You can subscribe via [RSS](/rss/feed.xml) or follow us [@${twitter}
          ](https://twitter.com/${twitter})`;

type Props = {
  currentSlug?: string;
  allPosts?: Post[];
};

function DevlogOtherPosts({ allPosts = [], currentSlug }: Props) {
  const other = allPosts.filter(
    (post) => post.slug !== currentSlug && post.publish
  );
  return (
    <div className="c-devlog-other-posts-keep-reading-wrapper wrapper">
      <div className="c-devlog-other-posts-keep-reading">
        <header className="c-devlog-other-posts-keep-reading-header">
          <h1 className="c-devlog-other-posts-keep-reading-title">
            Other Posts
          </h1>
          <Link
            className="c-devlog-other-posts-keep-reading-archive"
            href="/devlog/archive"
          >
            Archive
          </Link>
        </header>
        <Markdown className="c-devlog-other-posts-keep-reading-info -inverted">
          {info}
        </Markdown>
      </div>

      <div className="c-devlog-other-posts-grid wrapper">
        {other.map((item) => {
          return <PostPreview {...item} key={item.slug} />;
        })}
      </div>
    </div>
  );
}

export default DevlogOtherPosts;
