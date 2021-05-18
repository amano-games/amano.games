import PropTypes from 'prop-types';

import Manita from 'components/manita';

import style from './style.module.css';

function AboutUs({ manitas }) {
  return (
    <section className={`${style['about-us']}`} id="about">
      <div className="wrapper">
        <header className={style['about-us-header']}>
          <h1>About Us</h1>
        </header>
        <div className={style['about-us-manitas']}>
          {manitas.map((manita) => {
            return <Manita {...manita} key={manita.title} />;
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
