import PropTypes from 'prop-types';

import { random, range, randomPointNearRect } from 'utils/animation';

import Eye from 'components/eye';

import styles from './style.module.css';

function getCoords() {
  const [x, y] = randomPointNearRect(0, 0, 100, 100, 2, 6);

  return {
    top: `${x}%`,
    left: `${y}%`,
  };
}

const DEFAULT_COLOR = 'currentColor';

const generateEye = () => {
  const width = random(60, 100);
  const height = random(60, 100);
  const coords = getCoords();

  const eye = {
    id: String(random(10000, 99999)),
    createdAt: Date.now(),
    style: {
      transform: `rotate(${random(0, 180)}deg)`,
      position: 'absolute',
      width: `${width}px`,
      height: `${height}px`,
      ...coords,
    },
  };
  return eye;
};

const eyes = range(random(4, 10)).map(() => generateEye());

function EyesWrap({ color, children, ...rest }) {
  return (
    <div {...rest} className={styles['eyes-wrap']}>
      {eyes.map((item) => (
        <Eye key={item.id} style={item.style} />
      ))}
      <div className={styles['eyes-child-wrapper']}>{children}</div>
    </div>
  );
}

EyesWrap.propTypes = {
  color: PropTypes.string,
  children: PropTypes.node,
};

EyesWrap.defaultProps = {
  color: DEFAULT_COLOR,
  children: null,
};

export default EyesWrap;
