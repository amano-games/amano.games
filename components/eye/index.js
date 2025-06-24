import { useState, useEffect } from 'react';
import classNames from 'classnames';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import PropTypes from 'prop-types';
import useSound from 'use-sound';

import EyeIcon from 'svg/eye.svg';

import usePrefersReducedMotion from 'hooks/use-prefers-reduced-motion';

import styles from './style.module.css';
import animation from './eye.json';

const sfx = '/sfx/plop.mp3';

const openSegments = [0, 10];
const closeSegments = [12, 22];

function Eye({
  className,
  onClick = () => {},
  options,
  animationsOff = false,
  ...rest
}) {
  const [jsEnabled, setJsEnabled] = useState(false);
  const [play] = useSound(sfx);
  const [anim, setAnim] = useState(closeSegments);
  const customClassName = classNames(styles.eye, 'eye', className);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [dotLottie, setDotLottie] = useState(null);

  useEffect(() => {
    setJsEnabled(!prefersReducedMotion);
  }, []);

  useEffect(() => {
    // This function will be called when the animation is completed.
    function onComplete() {
      if (anim === closeSegments) {
        setAnim(openSegments);
        dotLottie.play();
      }
    }

    // Listen to events emitted by the DotLottie instance when it is available.
    if (dotLottie) {
      dotLottie.addEventListener('complete', onComplete);
    }

    return () => {
      // Remove event listeners when the component is unmounted.
      if (dotLottie) {
        dotLottie.removeEventListener('complete', onComplete);
      }
    };
  }, [dotLottie, anim]);

  const dotLottieRefCallback = (value) => {
    setDotLottie(value);
  };

  return (
    <button
      type="button"
      {...rest}
      className={customClassName}
      onClick={() => {
        if (animationsOff) return;
        play();
        setAnim(closeSegments);
        dotLottie.play();
        onClick();
      }}
    >
      {jsEnabled ? (
        <DotLottieReact
          {...options}
          data={animation}
          segment={anim}
          dotLottieRefCallback={dotLottieRefCallback}
          // onComplete={() => {
          //   if (anim === closeSegments) {
          //     setAnim(openSegments);
          //   }
          // }}
          loop={false}
          autoplay={!prefersReducedMotion}
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
  style: PropTypes.shape({}),
};

export default Eye;
