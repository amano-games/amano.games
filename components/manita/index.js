import PropTypes from 'prop-types';

import style from './style.module.css';

function Manita({ name, title, image, description, links }) {
  return (
    <article className={style['manita-item']}>
      <div className={style['manita-media']}>
        <img src={image} alt={name} />
      </div>
      <div className={style['manita-info']}>
        <header className={style['manita-header']}>
          <h2>{name}</h2>
          <h3>{title}</h3>
        </header>
        <div className={style['manita-actions']}>
          <div className={style['manita-where-to-play']}>
            <span className={style['manita-play-it']}>Play it here</span>
            <ul className={style['manita-links']}>
              {links.map((link) => {
                return (
                  <li key={link.url}>
                    <a href={link.url}>{link.type}</a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className={style['manita-description']}>{description}</div>
      </div>
    </article>
  );
}

Manita.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
      type: PropTypes.string,
    })
  ),
};

Manita.defaultProps = {
  links: [],
};

export default Manita;
