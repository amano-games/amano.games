import classNames from 'classnames';
import Link from 'next/link';

import Box from 'components/box';
import Markdown from 'components/markdown';
import PostAuthors from 'components/post-authors';
import type { Author, PostCover } from 'types/post';

import style from './style.module.css';

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
  tags?: string;
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
  tags = '',
  cover,
  excerpt,
}: Props) {
  const customClassName = classNames(
    style['post-preview'],
    'post-preview',
    '-inverted',
    className,
    {
      [style['-featured']]: featured,
    }
  );

  const datePosted = new Date(date);
  const dateParsed = datePosted.toLocaleDateString(undefined, options);
  const tagsArr = tags.split(',');
  const slugEncoded = encodeURIComponent(slug);

  return (
    <Box className={customClassName} inverted>
      {cover ? (
        <Link href={`/devlog/${slugEncoded}`} className={style['post-image']}>
          <img src={cover.url} alt={title} />
        </Link>
      ) : null}
      <header className={style['post-header']}>
        <h3 className={style['post-title']}>
          <Link href={`/devlog/${slugEncoded}`}>{title}</Link>
        </h3>
        <div className={style['post-info']}>
          <span className={style['post-date']}>
            <time>{dateParsed}</time>
          </span>
          <PostAuthors authors={authors} />
        </div>
      </header>
      {excerpt ? (
        <Markdown className={style['post-excerpt']}>{excerpt}</Markdown>
      ) : null}
      <footer className={style['post-footer']}>
        {tagsArr.length > 0 ? (
          <div className={style['post-tags']}>
            {tagsArr.map((tag) => {
              return <span key={tag}>#{tag}</span>;
            })}
          </div>
        ) : null}
      </footer>
    </Box>
  );
}

export default PostPreview;
