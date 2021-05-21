import PropTypes from 'prop-types';
import classNames from 'classnames';

import { random } from 'utils/animation';
import Eye from 'components/eye';

import layouts from './layouts';

import styles from './style.module.css';

const DEFAULT_COLOR = 'currentColor';

const generateEye = (x, y) => {
  const width = random(60, 100);
  const height = random(60, 100);

  const eye = {
    id: String(random(10000, 99999)),
    x: 0,
    y: 0,
    style: {
      transform: `rotate(${random(0, 360)}deg) translate(50%, 50%)`,
      width: `${width}px`,
      height: `${height}px`,
      top: `${y}%`,
      left: `${x}%`,
      position: 'absolute',
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
  const layout = layouts[0];

  const eyes = layout.map(({ x, y }) => generateEye(x, y));

  return (
    <div className={customClassName} {...rest}>
      <div className={styles['eyes-container']}>
        {eyes.map((item) => (
          <Eye key={item.id} style={item.style} />
        ))}
      </div>
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
  count: 3,
};

export default EyesWrap;
