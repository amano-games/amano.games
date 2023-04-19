import PropTypes from 'prop-types';
import classNames from 'classnames';

import Box from 'components/box';
import Markdown from 'components/markdown';

import Itch from 'svg/itch.svg';
import Newgrounds from 'svg/ng.svg';
import Pico from 'svg/pico.svg';
import Arrow from 'svg/arrow.svg';

import style from './style.module.css';

function getShouldShowLinks({ showLinks, links, trailer }) {
  if (!showLinks) return false;
  if (trailer) return true;
  if (links.length > 0) return true;
  return false;
}

function GameCard({
  name,
  badge,
  subtitle,
  featured,
  className,
  description,
  trailer,
  itch,
  newgrounds,
  lexaloffle,
  show_links: showLinks,
}) {
  console.log(name, showLinks);
  const links = [
    {
      label: 'itch.io',
      url: itch,
      icon: <Itch />,
    },
    {
      label: 'newgrounds',
      url: newgrounds,
      icon: <Newgrounds />,
    },
    {
      label: 'lexaloffle',
      url: lexaloffle,
      icon: <Pico />,
    },
  ].filter(({ url }) => url != null);
  const shouldShowLinks = getShouldShowLinks({ links, showLinks, trailer });

  const customClassName = classNames(
    style['game-card'],
    'game-card',
    className,
    {
      [style['-featured']]: featured,
    }
  );
  const slug = name.replace(/\s+/g, '-').toLowerCase();

  return (
    <Box className={customClassName}>
      <header className={style['game-header']}>
        <h2 className={style['game-title']}>{name}</h2>
        {subtitle ? (
          <h3 className={style['game-subtitle']}>{subtitle}</h3>
        ) : null}
      </header>
      <div className={style['game-content']}>
        <div className={style['game-info']}>
          <div className={style['game-media']}>
            {badge ? (
              <span className={style['game-badge']}>{badge}</span>
            ) : null}
            <img src={`/games/${slug}.png`} alt={name} />
          </div>
          {shouldShowLinks ? (
            <div className={style['game-actions']}>
              {links.length > 0 ? (
                <div className={style['game-where-to-play']}>
                  <span className={style['game-play-it']}>
                    <span className={style['game-play-it-text']}>
                      Play it here
                    </span>
                    <Arrow />
                  </span>
                  <div className={style['game-play-it-links']}>
                    {links.map((link) => {
                      return (
                        <a
                          key={link.url}
                          rel="noopener noreferrer"
                          target="_blank"
                          href={link.url}
                        >
                          {link.icon ? link.icon : link.label}
                        </a>
                      );
                    })}
                  </div>
                </div>
              ) : null}
              {trailer ? (
                <a
                  className={`${style['game-trailer']} ${style['game-action']}`}
                  href={trailer}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Trailer
                </a>
              ) : null}
            </div>
          ) : null}
        </div>
        <Markdown className={style['game-description']}>{description}</Markdown>
      </div>
    </Box>
  );
}

GameCard.propTypes = {
  name: PropTypes.string.isRequired,
  badge: PropTypes.string,
  subtitle: PropTypes.string,
  description: PropTypes.string.isRequired,
  className: PropTypes.string,
  trailer: PropTypes.string,
  itch: PropTypes.string,
  newgrounds: PropTypes.string,
  lexaloffle: PropTypes.string,
  featured: PropTypes.bool,
  show_links: PropTypes.bool,
};

GameCard.defaultProps = {
  badge: null,
  subtitle: null,
  className: null,
  trailer: null,
  itch: null,
  newgrounds: null,
  lexaloffle: null,
  featured: false,
  show_links: true,
};

export default GameCard;
