import GameCard from 'components/game-card';
import Fire from 'components/fire';

import style from './style.module.css';

const games = [
  {
    name: 'Pullfrog',
    tool: 'PICO-8',
    image: 'https://img.itch.zone/aW1nLzM3NzQ4MjAucG5n/315x250%23c/vgfcyf.png',
    description:
      'Tetris meets frog! A little puzzle platformer, equal parts fun and frustrating.',
    trailer: 'https://www.youtube.com/watch?v=1S-zTLn7X38',
    links: [
      {
        url: 'https://afk-mario.itch.io/pullfrog',
        type: 'itchio',
      },
    ],
  },
  {
    name: 'The Lost Night',
    tool: 'PICO-8',
    image:
      'https://img.itch.zone/aW1nLzUyOTM3MjYucG5n/315x250%23c/L7KO%2Fb.png',
    description: 'A small spooky themed RPG',
    links: [
      {
        url: 'https://afk-mario.itch.io/the-lost-night',
        type: 'itchio',
      },
    ],
  },
  {
    name: 'Virush',
    tool: 'PICO-8',
    image: 'https://img.itch.zone/aW1nLzM3ODMzMzkucG5n/315x250%23c/SgUh9T.png',
    description:
      'Survival turn based game where you have to build defenses to defeat all the virushes and survive the quarantine.',
    links: [
      {
        url: 'https://afk-mario.itch.io/virush',
        type: 'itchio',
      },
    ],
  },
];

function GameGallery() {
  return (
    <section className={`${style['game-gallery']} -inverted`}>
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
    </section>
  );
}

export default GameGallery;
