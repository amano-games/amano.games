import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import usePrefersReducedMotion from 'hooks/use-prefers-reduced-motion';

import animation from './fire-choppy.json';

function Fire(props) {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <DotLottieReact
      data={animation}
      {...props}
      loop
      autoplay={!prefersReducedMotion}
    />
  );
}

export default Fire;
