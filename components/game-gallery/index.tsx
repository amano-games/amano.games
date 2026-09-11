import type { HTMLAttributes } from 'react';
import { useRouter } from 'next/router';

import EyesWrap from 'components/eyes-wrap';
import EyesWrapAdmin from 'components/eyes-wrap-admin';
import GameCard from 'components/game-card';
import Fire from 'components/fire';
import type { Game } from 'types/game';

import style from './style.module.css';

type Props = {
  games: Game[];
} & HTMLAttributes<HTMLDivElement>;

function GameGallery({ games, ...rest }: Props) {
  const router = useRouter();
  const { edit } = router.query;

  const Wrap = edit ? EyesWrapAdmin : EyesWrap;

  return (
    <Wrap className={`${style['game-gallery']} -inverted`} {...rest}>
      <div className="wrapper">
        <header className={style['game-gallery-header']}>
          <h1>Our Games</h1>
          <Fire className={style['game-gallery-fire']} />
        </header>
        <div className={style['game-gallery-grid']}>
          {games
            .filter((game) => game.publish === true)
            .sort((a, b) => Number(b.featured) - Number(a.featured))
            .map((game) => {
              return <GameCard {...game} key={game.name} />;
            })}
        </div>
      </div>
    </Wrap>
  );
}

export default GameGallery;
