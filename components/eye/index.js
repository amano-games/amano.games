import { useState } from 'react';
import classNames from 'classnames';
import Lottie from 'react-lottie-player';
import PropTypes from 'prop-types';
import useSound from 'use-sound';

import style from './style.module.css';

import animation from './eye.json';

const sfx = '/sfx/plop.mp3';

const openSegments = [0, 10];
const closeSegments = [12, 22];

function Eye({ className, onClick, options, ...rest }) {
  const [play] = useSound(sfx);
  const [anim, setAnim] = useState(openSegments);
  const customClassName = classNames(style.eye, 'eye', className);

  return (
    <button
      type="button"
      {...rest}
      className={customClassName}
      onClick={() => {
        play();
        setAnim(closeSegments);
        onClick();
      }}
    >
      <Lottie
        {...options}
        animationData={animation}
        segments={anim}
        onComplete={() => {
          if (anim === closeSegments) {
            setAnim(openSegments);
          }
        }}
        loop={false}
        play
      />
    </button>
  );
}

Eye.propTypes = {
  options: PropTypes.shape({}),
  className: PropTypes.string,
  onClick: PropTypes.func,
};

Eye.defaultProps = {
  options: null,
  className: null,
  onClick: () => {},
};

export default Eye;
