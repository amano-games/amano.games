import React, { type HTMLAttributes, type ReactNode } from 'react';

import { random, range } from 'utils/animation';
import useRandomInterval from 'hooks/use-random-interval';
import usePrefersReducedMotion from 'hooks/use-prefers-reduced-motion';

import Sparkle from './sparkle';

const DEFAULT_COLOR = 'currentColor';

type SparkleItem = {
  id: string;
  createdAt: number;
  color: string;
  size: number;
  style: {
    top: string;
    left: string;
  };
};

const generateSparkle = (color: string): SparkleItem => {
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

type Props = {
  color?: string;
  children?: ReactNode;
} & HTMLAttributes<HTMLSpanElement>;

function Sparkles({
  color = DEFAULT_COLOR,
  children = null,
  ...delegated
}: Props) {
  const [loaded, setLoaded] = React.useState(false);
  const [sparkles, setSparkles] = React.useState(() => {
    return range(3).map(() => generateSparkle(color));
  });

  const prefersReducedMotion = usePrefersReducedMotion();

  React.useEffect(() => {
    setLoaded(true);
  }, [setLoaded]);

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
    <span {...delegated} className="c-sparkles">
      {loaded
        ? sparkles.map((sparkle) => (
            <Sparkle
              key={sparkle.id}
              color={sparkle.color}
              size={sparkle.size}
              style={sparkle.style}
            />
          ))
        : null}
      <strong className="c-sparkles-child-wrapper">{children}</strong>
    </span>
  );
}

export default Sparkles;
