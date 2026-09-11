import type { Author } from 'types/post';

import style from './style.module.css';

const listFormatter = new Intl.ListFormat('en', {
  style: 'long',
  type: 'conjunction',
});

type Props = {
  authors?: Author[];
};

function PostAuthors({ authors = [] }: Props) {
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

export default PostAuthors;
