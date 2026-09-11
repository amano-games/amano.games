'use client';

import { useState, useEffect, type ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import type { DotLottie } from '@lottiefiles/dotlottie-react';
import useSound from 'use-sound';

import EyeIcon from 'svg/eye.svg';

import usePrefersReducedMotion from 'hooks/use-prefers-reduced-motion';

import animation from './eye.json';
import './styles.css';

const sfx = '/sfx/plop.mp3';

const openSegments = [0, 10] as [number, number];
const closeSegments = [12, 22] as [number, number];

type Props = {
  options?: Record<string, unknown>;
  className?: string;
  onClick?: () => void;
  animationsOff?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

function Eye({
  className,
  onClick = () => {},
  options,
  animationsOff = false,
  ...rest
}: Props) {
  const [jsEnabled, setJsEnabled] = useState(false);
  const [play] = useSound(sfx);
  const [anim, setAnim] = useState(closeSegments);
  const customClassName = classNames('c-eye', className);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [dotLottie, setDotLottie] = useState<DotLottie | null>(null);

  useEffect(() => {
    setJsEnabled(!prefersReducedMotion);
  }, []);

  useEffect(() => {
    // This function will be called when the animation is completed.
    function onComplete() {
      if (anim === closeSegments) {
        setAnim(openSegments);
        dotLottie?.play();
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

  const dotLottieRefCallback = (value: DotLottie | null) => {
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
        dotLottie?.play();
        onClick();
      }}
    >
      {jsEnabled ? (
        <DotLottieReact
          {...options}
          data={animation}
          segment={anim}
          dotLottieRefCallback={dotLottieRefCallback}
          loop={false}
          autoplay={!prefersReducedMotion}
        />
      ) : (
        <EyeIcon />
      )}
    </button>
  );
}

export default Eye;
