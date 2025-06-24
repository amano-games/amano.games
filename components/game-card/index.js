import PropTypes from 'prop-types';
import classNames from 'classnames';

import Box from 'components/box';
import Markdown from 'components/markdown';

import Itch from 'svg/itch.svg';
import Newgrounds from 'svg/ng.svg';
import Pico from 'svg/pico.svg';
import PlayIcon from 'svg/play-icon.svg';
import Catalog from 'svg/playdate.svg';
import Steam from 'svg/steam.svg';

import style from './style.module.css';

function getShouldShowLinks({ showLinks, links, trailer, badge, wishlist }) {
  if (!showLinks) return false;
  if (badge != null) return true;
  if (wishlist != null) return true;
  if (trailer) return true;
  if (links.length > 0) return true;
  return false;
}

function GameCard({
  name,
  slug,
  badge = null,
  subtitle = null,
  featured = false,
  className = null,
  description,
  trailer = null,
  itch = null,
  newgrounds = null,
  lexaloffle = null,
  steam = null,
  catalog = null,
  wishlist = null,
  action = null,
  show_links: showLinks = true,
}) {
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
    {
      label: 'steam',
      url: steam,
      icon: <Steam />,
    },
    {
      label: 'catalog',
      url: catalog,
      icon: <Catalog className={style['catalog-badge']} />,
    },
  ].filter(({ url }) => url != null);
  const shouldShowLinks = getShouldShowLinks({
    links,
    showLinks,
    trailer,
    badge,
    wishlist,
  });

  const customClassName = classNames(
    style['game-card'],
    'game-card',
    className
  );

  const header = (
    <header className={style['game-header']}>
      <h2 className={style['game-title']}>{name}</h2>
      {subtitle ? <h3 className={style['game-subtitle']}>{subtitle}</h3> : null}
    </header>
  );

  return (
    <Box className={customClassName} data-featured={featured}>
      {!featured ? header : null}
      <div className={style['game-content']}>
        <div className={style['game-info']}>
          <div className={style['game-media']}>
            {badge ? (
              <span className={style['game-badge']}>{badge}</span>
            ) : null}

            <img src={`/games/${slug}.png`} alt={name} />
            {trailer ? (
              <a
                className={`${style['game-trailer-wrapper']}`}
                href={trailer}
                rel="noopener noreferrer"
                target="_blank"
              >
                <PlayIcon />
              </a>
            ) : null}
          </div>
          <div className={style['game-content-wrapper']}>
            {featured ? header : null}
            {shouldShowLinks ? (
              <div className={style['game-actions']}>
                <span className={style['game-call-to-action']}>{action}</span>
                <div className={style['game-actions-links']}>
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
            <Markdown className={style['game-description']}>
              {description}
            </Markdown>
          </div>
        </div>
      </div>
    </Box>
  );
}

GameCard.propTypes = {
  name: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  badge: PropTypes.string,
  subtitle: PropTypes.string,
  description: PropTypes.string.isRequired,
  action: PropTypes.string,
  className: PropTypes.string,
  trailer: PropTypes.string,
  itch: PropTypes.string,
  wishlist: PropTypes.string,
  newgrounds: PropTypes.string,
  lexaloffle: PropTypes.string,
  steam: PropTypes.string,
  catalog: PropTypes.string,
  featured: PropTypes.bool,
  show_links: PropTypes.bool,
};

export default GameCard;
