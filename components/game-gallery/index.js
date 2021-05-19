import PropTypes from 'prop-types';

import EyesWrap from 'components/eyes-wrap';
import GameCard from 'components/game-card';
import Fire from 'components/fire';

import style from './style.module.css';

function GameGallery({ games, ...rest }) {
  return (
    <EyesWrap className={`${style['game-gallery']} -inverted`} {...rest}>
      <div className="wrapper">
        <header className={style['game-gallery-header']}>
          <h1>Our Games</h1>
          <Fire className={style['game-gallery-fire']} />
        </header>
        <div className={style['game-gallery-grid']}>
          {games.map((game) => {
            return <GameCard {...game} key={game.name} />;
          })}
        </div>
      </div>
    </EyesWrap>
  );
}

GameGallery.propTypes = {
  games: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default GameGallery;
