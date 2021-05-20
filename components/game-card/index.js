import PropTypes from 'prop-types';

import Box from 'components/box';
import Markdown from 'components/markdown';

import Itch from 'svg/itch.svg';
import Newgrounds from 'svg/ng.svg';
import Pico from 'svg/pico.svg';
import Arrow from 'svg/arrow.svg';

import style from './style.module.css';

function GameCard({
  name,
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

  const slug = name.replace(/\s+/g, '-').toLowerCase();

  return (
    <Box className={style['game-card']}>
      <header className={style['game-header']}>
        <h2>{name}</h2>
      </header>
      <div className={style['game-media']}>
        <img src={`/games/${slug}.png`} alt={name} />
      </div>
      <div className={style['game-actions']}>
        <div className={style['game-where-to-play']}>
          <span className={style['game-play-it']}>
            <span className={style['game-play-it-text']}>Play it here</span>
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
        {trailer ? (
          <a
            className={style['game-trailer']}
            href={trailer}
            rel="noopener noreferrer"
            target="_blank"
          >
            Trailer
          </a>
        ) : null}
      </div>
      <Markdown className={style['game-description']}>{description}</Markdown>
    </Box>
  );
}

GameCard.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  trailer: PropTypes.string,
  itch: PropTypes.string,
  newgrounds: PropTypes.string,
  lexaloffle: PropTypes.string,
};

GameCard.defaultProps = {
  trailer: null,
  itch: null,
  newgrounds: null,
  lexaloffle: null,
};

export default GameCard;
