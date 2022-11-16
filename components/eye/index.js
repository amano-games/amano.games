import { useState, useEffect } from 'react';
import classNames from 'classnames';
import Lottie from 'react-lottie-player';
import PropTypes from 'prop-types';
import useSound from 'use-sound';

import EyeIcon from 'svg/eye.svg';

import usePrefersReducedMotion from 'hooks/use-prefers-reduced-motion';

import style from './style.module.css';
import animation from './eye.json';

const sfx = '/sfx/plop.mp3';

const openSegments = [0, 10];
const closeSegments = [12, 22];

function Eye({ className, onClick, options, animationsOff, ...rest }) {
  const [jsEnabled, setJsEnabled] = useState(false);
  const [play] = useSound(sfx);
  const [anim, setAnim] = useState(closeSegments);
  const customClassName = classNames(style.eye, 'eye', className);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    setJsEnabled(!prefersReducedMotion);
  }, []);

  return (
    <button
      type="button"
      {...rest}
      className={customClassName}
      onClick={() => {
        if (animationsOff) return;
        play();
        setAnim(closeSegments);
        onClick();
      }}
    >
      {jsEnabled ? (
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
          play={!prefersReducedMotion}
        />
      ) : (
        <EyeIcon />
      )}
    </button>
  );
}

Eye.propTypes = {
  options: PropTypes.shape({}),
  className: PropTypes.string,
  onClick: PropTypes.func,
  animationsOff: PropTypes.bool,
};

Eye.defaultProps = {
  options: null,
  className: null,
  onClick: () => {},
  animationsOff: false,
};

export default Eye;
