import Lottie from 'react-lottie-player';
import animation from './fire-choppy.json';

const Fire = (props) => {
  return <Lottie animationData={animation} {...props} play />;
};

export default Fire;
