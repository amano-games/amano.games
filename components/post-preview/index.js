import PropTypes from 'prop-types';
import classNames from 'classnames';
import Link from 'next/link';

import Box from 'components/box';
import Markdown from 'components/markdown';

import style from './style.module.css';

const options = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
};

function PostPreview({
  slug,
  title,
  featured,
  className,
  date,
  author,
  tags,
  cover,
  excerpt,
}) {
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

  return (
    <Box className={customClassName} inverted>
      {cover ? (
        <Link href={`/devlog/${slug}`}>
          <a className={style['post-image']}>
            <img src={cover.url} alt={title} />
          </a>
        </Link>
      ) : null}
      <header className={style['post-header']}>
        <h3 className={style['post-title']}>
          <Link href={`/devlog/${slug}`}>
            <a>{title}</a>
          </Link>
        </h3>
        <div className={style['post-info']}>
          <span className={style['post-date']}>
            <date>{dateParsed}</date>
          </span>
          <span className={style['post-author']}>
            By:{' '}
            <a rel="noopener noreferrer" target="_blank" href={author.url}>
              {author.name}
            </a>
          </span>
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

PostPreview.propTypes = {
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  author: PropTypes.shape({ name: PropTypes.string, url: PropTypes.string })
    .isRequired,
  cover: PropTypes.shape({ url: PropTypes.string }),
  tags: PropTypes.string,
  className: PropTypes.string,
  featured: PropTypes.bool,
  excerpt: PropTypes.string,
};

PostPreview.defaultProps = {
  className: null,
  featured: false,
  tags: '',
  cover: null,
  excerpt: null,
};

export default PostPreview;
