import PropTypes from 'prop-types';

import Box from 'components/box';

import Itch from 'svg/itch.svg';
import Newgrounds from 'svg/ng.svg';
import Pico from 'svg/pico.svg';
import Arrow from 'svg/arrow.svg';

import style from './style.module.css';

function GameCard({
  name,
  image,
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

  return (
    <Box className={style['game-card']}>
      <header className={style['game-header']}>
        <h2>{name}</h2>
      </header>
      <div className={style['game-media']}>
        <img src={image} alt={name} />
      </div>
      <div className={style['game-actions']}>
        <div className={style['game-where-to-play']}>
          <span className={style['game-play-it']}>
            <span className={style['game-play-it-text']}>Play it here</span>
            <Arrow />
          </span>
          {links.map((link) => {
            return (
              <a rel="noopener noreferrer" target="_blank" href={link.url}>
                {link.icon ? link.icon : link.label}
              </a>
            );
          })}
        </div>
        {trailer ? (
          <a className={style['game-trailer']} href={trailer}>
            Trailer
          </a>
        ) : null}
      </div>
      <div className={style['game-description']}>{description}</div>
    </Box>
  );
}

GameCard.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
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
