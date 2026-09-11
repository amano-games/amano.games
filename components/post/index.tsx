import classNames from 'classnames';
import Link from 'next/link';

import Box from 'components/box';
import Markdown from 'components/markdown';
import PostAuthors from 'components/post-authors';
import type { Author } from 'types/post';

import style from './style.module.css';

const options: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

type Props = {
  slug: string;
  title: string;
  date: string;
  content?: string;
  authors?: Author[];
  tags?: string;
  className?: string;
  featured?: boolean;
};

function Post({
  slug,
  title,
  featured = false,
  className,
  content = '',
  date,
  authors = [],
  tags = '',
}: Props) {
  const customClassName = classNames(
    style.post,
    'post',
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
    <article className={customClassName}>
      <header className={style['post-header']}>
        <h1 className={style['post-title']}>
          <Link href={`/devlog/${slugEncoded}`}>{title}</Link>
        </h1>
      </header>
      <Markdown className={style['post-content']}>{content}</Markdown>
      <footer className={style['post-footer']}>
        <div className={style['post-info']}>
          <span className={style['post-date']}>
            <time>{dateParsed}</time>
          </span>
          <PostAuthors authors={authors} />
        </div>
        {tagsArr.length > 0 ? (
          <Box className={style['post-tags']}>
            {tagsArr.map((tag) => {
              return <span key={tag}>#{tag}</span>;
            })}
          </Box>
        ) : null}
      </footer>
    </article>
  );
}

export default Post;
