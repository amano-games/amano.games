import PropTypes from 'prop-types';
import classNames from 'classnames';

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

function EyesWrap({ className, color, children, count, ...rest }) {
  const customClassName = classNames(
    styles['eyes-wrap'],
    'eyes-wrap',
    className
  );
  const eyes = range(count).map(() => generateEye());
  return (
    <div {...rest} className={customClassName}>
      {eyes.map((item) => (
        <Eye key={item.id} style={item.style} />
      ))}
      {children}
    </div>
  );
}

EyesWrap.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  children: PropTypes.node,
  count: PropTypes.number,
};

EyesWrap.defaultProps = {
  className: null,
  color: DEFAULT_COLOR,
  children: null,
  count: random(4, 10),
};

export default EyesWrap;
