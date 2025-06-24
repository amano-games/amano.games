import PropTypes from 'prop-types';
import classNames from 'classnames';

import Avatar from 'components/avatar';
import Markdown from 'components/markdown';

import Itch from 'svg/itch.svg';
import Twitter from 'svg/twitter.svg';
import Instagram from 'svg/insta.svg';
import Web from 'svg/web.svg';
import Fediverse from 'svg/fediverse.svg';

import style from './style.module.css';

function Manita({
  title,
  subtitle,
  avatar,
  description,
  itchio,
  mastodon = null,
  twitter = null,
  web,
  instagram = null,
  className = null,
  flipped = false,
}) {
  const customClassName = classNames(style.manita, 'manita', className, {
    [style['-flipped']]: flipped,
  });

  const links = [
    {
      label: 'web',
      url: web,
      icon: <Web />,
    },
    {
      label: 'itchio',
      url: itchio,
      icon: <Itch />,
    },
  ];

  if (instagram) {
    links.unshift({
      label: 'Instagram',
      url: `https://instagram.com/${instagram}`,
      icon: <Instagram />,
    });
  }

  if (twitter) {
    links.unshift({
      label: `@${twitter}`,
      url: `https://twitter.com/${twitter}`,
      icon: <Twitter />,
    });
  }

  if (mastodon) {
    links.unshift({
      label: 'Fediverse',
      url: mastodon,
      icon: <Fediverse />,
    });
  }

  return (
    <article className={customClassName}>
      <Avatar
        className={style['manita-media']}
        flipped={flipped}
        src={avatar}
        alt={title}
      />
      <div className={style['manita-info']}>
        <header className={style['manita-header']}>
          <h2>{title}</h2>
          <h3>{subtitle}</h3>
        </header>
        <Markdown className={style['manita-description']}>
          {description}
        </Markdown>
        <ul className={style['manita-links']}>
          {links.map((link) => {
            return (
              <li key={link.url}>
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href={link.url}
                  aria-label={link.label}
                >
                  {link.icon ? link.icon : link.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </article>
  );
}

Manita.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  itchio: PropTypes.string.isRequired,
  twitter: PropTypes.string,
  mastodon: PropTypes.string,
  web: PropTypes.string.isRequired,
  instagram: PropTypes.string,
  flipped: PropTypes.bool,
};

export default Manita;
