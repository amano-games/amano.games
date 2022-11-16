import React from 'react';
import PropTypes from 'prop-types';

import { random, range } from 'utils/animation';
import useRandomInterval from 'hooks/use-random-interval';
import usePrefersReducedMotion from 'hooks/use-prefers-reduced-motion';

import Sparkle from './sparkle';

import styles from './style.module.css';

const DEFAULT_COLOR = 'currentColor';
const generateSparkle = (color) => {
  const sparkle = {
    id: String(random(10000, 99999)),
    createdAt: Date.now(),
    color,
    size: random(10, 20),
    style: {
      top: `${random(0, 100)}%`,
      left: `${random(0, 100)}%`,
    },
  };
  return sparkle;
};

function Sparkles({ color, children, ...delegated }) {
  const [sparkles, setSparkles] = React.useState(() => {
    return range(3).map(() => generateSparkle(color));
  });

  const prefersReducedMotion = usePrefersReducedMotion();

  useRandomInterval(
    () => {
      const sparkle = generateSparkle(color);
      const now = Date.now();
      const nextSparkles = sparkles.filter((sp) => {
        const delta = now - sp.createdAt;
        return delta < 750;
      });
      nextSparkles.push(sparkle);
      setSparkles(nextSparkles);
    },
    prefersReducedMotion ? null : 50,
    prefersReducedMotion ? null : 450
  );

  return (
    <span {...delegated} className={styles.sparkles}>
      {sparkles.map((sparkle) => (
        <Sparkle
          key={sparkle.id}
          color={sparkle.color}
          size={sparkle.size}
          style={sparkle.style}
        />
      ))}
      <strong className={styles['child-wrapper']}>{children}</strong>
    </span>
  );
}

Sparkles.propTypes = {
  color: PropTypes.string,
  children: PropTypes.node,
};

Sparkles.defaultProps = {
  color: DEFAULT_COLOR,
  children: null,
};

export default Sparkles;
