import PropTypes from 'prop-types';
import classNames from 'classnames';

import Avatar from 'components/avatar';
import Markdown from 'components/markdown';

import Itch from 'svg/itch.svg';
import Twitter from 'svg/twitter.svg';
import Instagram from 'svg/insta.svg';
import Web from 'svg/web.svg';
import Mastodon from 'svg/mastodon.svg';

import style from './style.module.css';

function Manita({
  title,
  subtitle,
  avatar,
  description,
  itchio,
  mastodon,
  twitter,
  web,
  instagram,
  className,
  flipped,
}) {
  const customClassName = classNames(style.manita, 'manita', className, {
    [style['-flipped']]: flipped,
  });

  const links = [
    {
      label: `@${twitter}`,
      url: `https://twitter.com/${twitter}`,
      icon: <Twitter />,
    },
    {
      label: 'Instagram',
      url: `https://instagram.com/${instagram}`,
      icon: <Instagram />,
    },
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
          {mastodon ? (
            <li>
              <a
                // eslint-disable-next-line react/no-invalid-html-attribute
                rel="me noopener noreferrer"
                target="_blank"
                href={mastodon}
                aria-label="Mastodon"
              >
                <Mastodon />
              </a>
            </li>
          ) : null}
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
  twitter: PropTypes.string.isRequired,
  mastodon: PropTypes.string,
  web: PropTypes.string.isRequired,
  instagram: PropTypes.string.isRequired,
  flipped: PropTypes.bool,
};

Manita.defaultProps = {
  className: null,
  flipped: false,
  mastodon: null,
};

export default Manita;
