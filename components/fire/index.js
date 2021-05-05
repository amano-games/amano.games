import Lottie from 'lottie-react';
import animation from './fire-choppy.json';

const Fire = (props) => {
  return <Lottie animationData={animation} {...props} />;
};

export default Fire;
