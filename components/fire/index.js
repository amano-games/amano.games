import Lottie from 'lottie-react';
import animation from './fire.json';

const Fire = (props) => {
  return <Lottie animationData={animation} {...props} />;
};

export default Fire;
