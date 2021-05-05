import PropTypes from 'prop-types';

import style from './style.module.css';

function GameCard({ name, image, description, links, trailer }) {
  return (
    <article className={style['game-card']}>
      <header className={style['game-header']}>
        <h2>{name}</h2>
      </header>
      <div className={style['game-media']}>
        <img src={image} alt={name} />
      </div>
      <div className={style['game-actions']}>
        <div className={style['game-where-to-play']}>
          <span className={style['game-play-it']}>Play it here</span>
          <ul className={style['game-links']}>
            {links.map((link) => {
              return (
                <li key={link.url}>
                  <a href={link.url}>{link.type}</a>
                </li>
              );
            })}
          </ul>
        </div>
        {trailer ? (
          <a className={style['game-trailer']} href={trailer}>
            Trailer
          </a>
        ) : null}
      </div>
      <div className={style['game-description']}>{description}</div>
    </article>
  );
}

GameCard.propTypes = {
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  trailer: PropTypes.string,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
      type: PropTypes.string,
    })
  ),
};

GameCard.defaultProps = {
  links: [],
  trailer: null,
};

export default GameCard;
