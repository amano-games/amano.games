import type { HTMLAttributes } from 'react';

import GameCard from 'components/game-card';
import Fire from 'components/fire';
import type { Game } from 'types/game';

import GameGalleryWrap from './wrap';
import './styles.css';

type Props = {
  games: Game[];
} & HTMLAttributes<HTMLDivElement>;

function GameGallery({ games, ...rest }: Props) {
  return (
    <GameGalleryWrap {...rest}>
      <div className="wrapper">
        <header className="c-game-gallery-header">
          <h1>Our Games</h1>
          <Fire className="c-game-gallery-fire" />
        </header>
        <div className="c-game-gallery-grid">
          {games
            .filter((game) => game.publish === true)
            .sort((a, b) => Number(b.featured) - Number(a.featured))
            .map((game) => {
              return <GameCard {...game} key={game.name} />;
            })}
        </div>
      </div>
    </GameGalleryWrap>
  );
}

export default GameGallery;
