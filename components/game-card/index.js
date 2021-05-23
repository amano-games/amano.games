import PropTypes from 'prop-types';
import classNames from 'classnames';

import Box from 'components/box';
import Markdown from 'components/markdown';

import Itch from 'svg/itch.svg';
import Newgrounds from 'svg/ng.svg';
import Pico from 'svg/pico.svg';
import Arrow from 'svg/arrow.svg';

import style from './style.module.css';

function GameCard({
  name,
  featured,
  className,
  description,
  trailer,
  itch,
  newgrounds,
  lexaloffle,
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
  ].filter(({ url }) => url != null);

  const customClassName = classNames(
    style['game-card'],
    'game-card',
    className,
    {
      [style['-featured']]: featured,
    }
  );
  const slug = name.replace(/\s+/g, '-').toLowerCase();
  console.log('slug', slug);

  return (
    <Box className={customClassName}>
      <header className={style['game-header']}>
        <h2 className={style['game-title']}>{name}</h2>
      </header>
      <div className={style['game-content']}>
        <div className={style['game-info']}>
          <div className={style['game-media']}>
            <img src={`/games/${slug}.png`} alt={name} />
          </div>
          {links.length > 0 || trailer ? (
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
  description: PropTypes.string.isRequired,
  className: PropTypes.string,
  trailer: PropTypes.string,
  itch: PropTypes.string,
  newgrounds: PropTypes.string,
  lexaloffle: PropTypes.string,
  featured: PropTypes.bool,
};

GameCard.defaultProps = {
  className: null,
  trailer: null,
  itch: null,
  newgrounds: null,
  lexaloffle: null,
  featured: false,
};

export default GameCard;
