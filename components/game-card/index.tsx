import type { ReactNode } from 'react';
import classNames from 'classnames';

import Box from 'components/box';
import Markdown from 'components/markdown';
import type { Game } from 'types/game';

import Itch from 'svg/itch.svg';
import Newgrounds from 'svg/ng.svg';
import Pico from 'svg/pico.svg';
import PlayIcon from 'svg/play-icon.svg';
import Catalog from 'svg/playdate.svg';
import Steam from 'svg/steam.svg';

import style from './style.module.css';

type LinkItem = {
  label: string;
  url: string | null | undefined;
  icon: ReactNode;
};

function getShouldShowLinks({
  showLinks,
  links,
  trailer,
  badge,
  wishlist,
}: {
  showLinks: boolean;
  links: LinkItem[];
  trailer?: string | null;
  badge?: string | null;
  wishlist?: string | null;
}) {
  if (!showLinks) return false;
  if (badge != null) return true;
  if (wishlist != null) return true;
  if (trailer) return true;
  if (links.length > 0) return true;
  return false;
}

type Props = Game;

function GameCard({
  name,
  slug,
  badge = null,
  subtitle = null,
  featured = false,
  className,
  description,
  trailer = null,
  itch = null,
  presskit = null,
  newgrounds = null,
  lexaloffle = null,
  steam = null,
  catalog = null,
  wishlist = null,
  action = null,
  show_links: showLinks = true,
}: Props) {
  const links: LinkItem[] = [
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
  ].filter((item) => item.url != null);
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
                        href={link.url ?? undefined}
                      >
                        {link.icon ? link.icon : link.label}
                      </a>
                    );
                  })}
                  {presskit ? (
                    <a className={style['game-presskit']} href={presskit}>
                      Presskit
                    </a>
                  ) : null}
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

export default GameCard;
