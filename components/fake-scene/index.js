import PropTypes from 'prop-types';
import classNames from 'classnames';
import Logo from 'svg/logo.svg';

import style from './style.module.css';

function FakeScene({ className }) {
  const customClassName = classNames(
    style['fake-scene'],
    'fake-scene',
    className
  );
  return (
    <div className={customClassName}>
      <Logo />
    </div>
  );
}

FakeScene.propTypes = {
  className: PropTypes.string,
};

FakeScene.defaultProps = {
  className: null,
};

export default FakeScene;
