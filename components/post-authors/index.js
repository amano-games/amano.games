import PropTypes from 'prop-types';

import style from './style.module.css';

const listFormatter = new Intl.ListFormat('en', {
  style: 'long',
  type: 'conjunction',
});

function PostAuthors({ authors = [] }) {
  const flat = authors.map((item) => `${item.name};${item.url}`);
  return (
    <span className={style['post-author']}>
      By:{' '}
      {listFormatter.formatToParts(flat).map((item) => {
        if (item.type === 'element') {
          const [name, url] = item.value.split(';');
          return (
            <a
              key={item.value}
              rel="noopener noreferrer"
              target="_blank"
              href={url}
            >
              {name}
            </a>
          );
        }
        return item.value;
      })}
    </span>
  );
}

PostAuthors.propTypes = {
  authors: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      url: PropTypes.string,
      mastodon: PropTypes.string,
    })
  ),
};

export default PostAuthors;
