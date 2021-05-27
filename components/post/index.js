import PropTypes from 'prop-types';
import classNames from 'classnames';

import Box from 'components/box';
import Markdown from 'components/markdown';

import style from './style.module.css';

const options = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

function Post({ title, featured, className, content, date, author, tags }) {
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

  return (
    <article className={customClassName}>
      <header className={style['post-header']}>
        <h1 className={style['post-title']}>{title}</h1>
      </header>
      <Markdown className={style['post-content']}>{content}</Markdown>
      <footer className={style['post-footer']}>
        <div className={style['post-info']}>
          <span className={style['post-date']}>
            Posted <date>{dateParsed}</date>
          </span>
          <span className={style['post-author']}>
            By:{' '}
            <a rel="noopener noreferrer" target="_blank" href={author.url}>
              {author.name}
            </a>
          </span>
        </div>
        {tagsArr.length > 0 ? (
          <Box className={style['post-tags']}>
            {tagsArr.map((tag) => {
              return <span>#{tag}</span>;
            })}
          </Box>
        ) : null}
      </footer>
    </article>
  );
}

Post.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  author: PropTypes.shape({ name: PropTypes.string, url: PropTypes.string })
    .isRequired,
  tags: PropTypes.string,
  content: PropTypes.string.isRequired,
  className: PropTypes.string,
  featured: PropTypes.bool,
};

Post.defaultProps = {
  className: null,
  featured: false,
  tags: '',
};

export default Post;
