import PropTypes from 'prop-types';

import Manita from 'components/manita';
import Fingers from 'svg/fingers2.svg';

import style from './style.module.css';

function AboutUs({ manitas }) {
  return (
    <section className={`${style['about-us']}`} id="about">
      <Fingers className={style['about-us-fingers']} />
      <div className="wrapper">
        <header className={style['about-us-header']}>
          <h1>About Us</h1>
        </header>
        <div className={style['about-us-manitas']}>
          {manitas.map((manita, i) => {
            const flipped = i % 2 !== 0;
            return <Manita {...manita} key={manita.title} flipped={flipped} />;
          })}
        </div>
      </div>
    </section>
  );
}

AboutUs.propTypes = {
  manitas: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default AboutUs;
