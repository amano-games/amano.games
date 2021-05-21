import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Draggable from 'react-draggable';
import DownloadLink from 'react-download-link';
import useDimensions from 'react-use-dimensions';

import { random, range } from 'utils/animation';

import Eye from 'components/eye';

import styles from './style.module.css';

const DEFAULT_COLOR = 'currentColor';

const generateEye = () => {
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

function EyesWrapAdmin({ className, color, children, count, ...rest }) {
  const [ref, { width, height }] = useDimensions();
  const customClassName = classNames(
    styles['eyes-wrap'],
    'eyes-wrap',
    className
  );

  const [eyes, setEyes] = React.useState(range(count).map(() => generateEye()));

  const addEye = React.useCallback(() => {
    const nEye = generateEye();
    setEyes([...eyes, nEye]);
  });

  const clearEyes = React.useCallback(() => {
    setEyes([]);
  });

  const handleStop = React.useCallback(({ id, x, y }) => {
    setEyes(
      eyes.map((item) => {
        if (item.id !== id) return item;
        return {
          ...item,
          x,
          y,
          xP: (x / width) * 100,
          yP: (y / height) * 100,
        };
      })
    );
  });

  return (
    <div className={customClassName} {...rest} ref={ref}>
      <div className={styles['add-eye']}>
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
      <div className={styles['eyes-container']}>
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

EyesWrapAdmin.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  children: PropTypes.node,
  count: PropTypes.number,
};

EyesWrapAdmin.defaultProps = {
  className: null,
  color: DEFAULT_COLOR,
  children: null,
  count: 3,
};

export default EyesWrapAdmin;
