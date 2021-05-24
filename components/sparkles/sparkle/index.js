import PropTypes from 'prop-types';

import styles from './style.module.css';

function Sparkle({ size, color, style }) {
  return (
    <span style={style} className={styles['sparkle-wrapper']}>
      <svg
        className={styles['sparkle-svg']}
        width={size}
        height={size}
        viewBox="0 0 64 100.2"
        fill="none"
      >
        <polygon points="64,48.5 32,100.2 0,48.5 32,0 " fill={color} />
      </svg>
    </span>
  );
}

Sparkle.propTypes = {
  size: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  style: PropTypes.shape({}).isRequired,
};

export default Sparkle;
