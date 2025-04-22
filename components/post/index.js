import PropTypes from 'prop-types';
import classNames from 'classnames';
import Link from 'next/link';

import Box from 'components/box';
import Markdown from 'components/markdown';

import PostAuthors from 'components/post-authors';

import style from './style.module.css';

const options = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

function Post({
  slug,
  title,
  featured,
  className,
  content,
  date,
  authors,
  tags,
}) {
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

Post.propTypes = {
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  authors: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      url: PropTypes.string,
      mastodon: PropTypes.string,
    })
  ),
  tags: PropTypes.string,
  content: PropTypes.string.isRequired,
  className: PropTypes.string,
  featured: PropTypes.bool,
};

Post.defaultProps = {
  className: null,
  featured: false,
  tags: '',
  authors: [],
};

export default Post;
