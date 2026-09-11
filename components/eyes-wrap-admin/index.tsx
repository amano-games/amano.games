'use client';

import React, {
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import classNames from 'classnames';
import Draggable from 'react-draggable';
import DownloadLink from 'react-download-link';
import useDimensions from 'react-use-dimensions';

import { random, range } from 'utils/animation';

import Eye from 'components/eye';
import './styles.css';

type EyeItem = {
  id: string;
  x: number;
  y: number;
  xP?: number;
  yP?: number;
  style: CSSProperties;
};

const generateEye = (): EyeItem => {
  const width = random(60, 100);
  const height = random(60, 100);

  const eye = {
    id: String(random(10000, 99999)),
    x: 0,
    y: 0,
    style: {
      transform: `rotate(${random(0, 180)}deg)`,
      width: `${width}px`,
      height: `${height}px`,
    },
  };
  return eye;
};

type Props = {
  className?: string;
  color?: string;
  children?: ReactNode;
  count?: number;
} & HTMLAttributes<HTMLDivElement>;

function EyesWrapAdmin({
  className,
  children = null,
  count = 3,
  ...rest
}: Props) {
  const [ref, { width, height }] = useDimensions();
  const customClassName = classNames('c-eyes-wrap-admin', className);

  const [eyes, setEyes] = React.useState(range(count).map(() => generateEye()));

  const addEye = React.useCallback(() => {
    const nEye = generateEye();
    setEyes([...eyes, nEye]);
  }, [eyes]);

  const clearEyes = React.useCallback(() => {
    setEyes([]);
  }, []);

  const handleStop = React.useCallback(
    ({ id, x, y }: { id: string; x: number; y: number }) => {
      setEyes(
        eyes.map((item) => {
          if (item.id !== id) return item;
          return {
            ...item,
            x,
            y,
            xP: width ? (x / width) * 100 : 0,
            yP: height ? (y / height) * 100 : 0,
          };
        })
      );
    },
    [eyes, width, height]
  );

  return (
    <div className={customClassName} {...rest} ref={ref}>
      <div className="c-eyes-wrap-admin-add-eye">
        <button type="button" onClick={addEye}>
          Add
        </button>
        <button type="button" onClick={clearEyes}>
          Clear
        </button>
        <DownloadLink
          style={{ color: 'var(--black)', background: 'var(--yellow)' }}
          label="Save"
          filename="eyes.json"
          exportFile={() =>
            JSON.stringify(
              eyes.map(({ xP, yP }) => {
                return {
                  x: xP,
                  y: yP,
                };
              }),
              null,
              2
            )
          }
        />
      </div>
      <div className="c-eyes-wrap-admin-container">
        {eyes.map((item) => (
          <Draggable
            key={item.id}
            onStop={(_, data) => {
              handleStop({ ...data, id: item.id });
            }}
            position={{ x: item.x, y: item.y }}
          >
            <Eye key={item.id} style={item.style} animationsOff />
          </Draggable>
        ))}
      </div>
      {children}
    </div>
  );
}

export default EyesWrapAdmin;
