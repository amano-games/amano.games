import Lottie from 'react-lottie-player';
import usePrefersReducedMotion from 'hooks/use-prefers-reduced-motion';

import animation from './fire-choppy.json';

const Fire = (props) => {
  const prefersReducedMotion = usePrefersReducedMotion();
  return (
    <Lottie animationData={animation} {...props} play={!prefersReducedMotion} />
  );
};

export default Fire;
