import PropTypes from 'prop-types';

import Itch from 'svg/itch.svg';
import Twitter from 'svg/twitter.svg';
import Instagram from 'svg/insta.svg';
import Web from 'svg/web.svg';

import style from './style.module.css';

function Manita({
  title,
  subtitle,
  avatar,
  description,
  itchio,
  twitter,
  web,
  instagram,
}) {
  const links = [
    {
      label: `@${twitter}`,
      url: `https://twitter.com/${twitter}`,
      icon: <Twitter />,
    },
    {
      label: instagram,
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
    <article className={style['manita-item']}>
      <div className={style['manita-media']}>
        <img src={avatar} alt={title} />
      </div>
      <div className={style['manita-info']}>
        <header className={style['manita-header']}>
          <h2>{title}</h2>
          <h3>{subtitle}</h3>
        </header>
        <div className={style['manita-actions']}>
          <div className={style['manita-where-to-play']}>
            <ul className={style['manita-links']}>
              {links.map((link) => {
                return (
                  <li key={link.url}>
                    <a
                      rel="noopener noreferrer"
                      target="_blank"
                      href={link.url}
                    >
                      {link.icon ? link.icon : link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className={style['manita-description']}>{description}</div>
      </div>
    </article>
  );
}

Manita.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  itchio: PropTypes.string.isRequired,
  twitter: PropTypes.string.isRequired,
  web: PropTypes.string.isRequired,
  instagram: PropTypes.string.isRequired,
};

Manita.defaultProps = {};

export default Manita;
