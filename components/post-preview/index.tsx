import classNames from 'classnames';
import Link from 'next/link';

import Box from 'components/box';
import Markdown from 'components/markdown';
import PostAuthors from 'components/post-authors';
import type { Author, PostCover } from 'types/post';
import './styles.css';

const options: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
};

type Props = {
  slug: string;
  title: string;
  date: string;
  authors?: Author[];
  cover?: PostCover;
  tags?: string[];
  className?: string;
  featured?: boolean;
  excerpt?: string;
};

function PostPreview({
  slug,
  title,
  featured = false,
  className,
  date,
  authors = [],
  tags = [],
  cover,
  excerpt,
}: Props) {
  const customClassName = classNames('c-post-preview', '-inverted', className, {
    'c-post-preview-featured': featured,
  });

  const datePosted = new Date(date);
  const dateParsed = datePosted.toLocaleDateString(undefined, options);
  const slugEncoded = encodeURIComponent(slug);

  return (
    <Box className={customClassName} inverted>
      {cover ? (
        <Link href={`/devlog/${slugEncoded}`} className="c-post-preview-image">
          <img src={cover.url} alt={title} />
        </Link>
      ) : null}
      <header className="c-post-preview-header">
        <h3 className="c-post-preview-title">
          <Link href={`/devlog/${slugEncoded}`}>{title}</Link>
        </h3>
        <div className="c-post-preview-info">
          <span className="c-post-preview-date">
            <time>{dateParsed}</time>
          </span>
          <PostAuthors authors={authors} />
        </div>
      </header>
      {excerpt ? (
        <Markdown className="c-post-preview-excerpt">{excerpt}</Markdown>
      ) : null}
      <footer className="c-post-preview-footer">
        {tags.length > 0 ? (
          <div className="c-post-preview-tags">
            {tags.map((tag) => {
              return <span key={tag}>#{tag}</span>;
            })}
          </div>
        ) : null}
      </footer>
    </Box>
  );
}

export default PostPreview;
