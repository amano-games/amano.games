'use client';

import React, { type HTMLAttributes, type ReactNode } from 'react';
import classNames from 'classnames';

import { random, shuffleArray } from 'utils/animation';
import Eye from 'components/eye';

import layouts from './layouts';
import './styles.css';

function generateEye(x: number, y: number) {
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
      position: 'absolute' as const,
    },
  };
  return eye;
}

type Props = {
  className?: string;
  color?: string;
  children?: ReactNode;
  count?: number;
} & HTMLAttributes<HTMLDivElement>;

function EyesWrap({ className, children = null, ...rest }: Props) {
  const [loaded, setLoaded] = React.useState(false);
  const customClassName = classNames('c-eyes-wrap', className);
  const layout = shuffleArray(layouts)[0];

  const eyes = layout.map(({ x, y }) => generateEye(x, y));
  React.useEffect(() => {
    setLoaded(true);
  }, [setLoaded]);

  return (
    <div className={customClassName} {...rest}>
      <div className="c-eyes-wrap-container">
        {loaded
          ? eyes.map((item) => (
              <Eye key={item.id} style={loaded ? item.style : undefined} />
            ))
          : null}
      </div>
      {children}
    </div>
  );
}

export default EyesWrap;
