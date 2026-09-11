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
import './styles.css';

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
      icon: <Catalog className="c-game-card-catalog-badge" />,
    },
  ].filter((item) => item.url != null);
  const shouldShowLinks = getShouldShowLinks({
    links,
    showLinks,
    trailer,
    badge,
    wishlist,
  });

  const customClassName = classNames('c-game-card', className);

  const header = (
    <header className="c-game-card-header">
      <h2 className="c-game-card-title">{name}</h2>
      {subtitle ? <h3 className="c-game-card-subtitle">{subtitle}</h3> : null}
    </header>
  );

  return (
    <Box className={customClassName} data-featured={featured}>
      {!featured ? header : null}
      <div className="c-game-card-content">
        <div className="c-game-card-info">
          <div className="c-game-card-media">
            {badge ? <span className="c-game-card-badge">{badge}</span> : null}

            <img src={`/games/${slug}.png`} alt={name} />
            {trailer ? (
              <a
                className="c-game-card-trailer-wrapper"
                href={trailer}
                rel="noopener noreferrer"
                target="_blank"
              >
                <PlayIcon />
              </a>
            ) : null}
          </div>
          <div className="c-game-card-content-wrapper">
            {featured ? header : null}
            {shouldShowLinks ? (
              <div className="c-game-card-actions">
                <span className="c-game-card-call-to-action">{action}</span>
                <div className="c-game-card-actions-links">
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
                    <a className="c-game-card-presskit" href={presskit}>
                      Presskit
                    </a>
                  ) : null}
                </div>
              </div>
            ) : null}
            <Markdown className="c-game-card-description">
              {description}
            </Markdown>
          </div>
        </div>
      </div>
    </Box>
  );
}

export default GameCard;
