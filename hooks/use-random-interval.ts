import React from 'react';

import { random } from 'utils/animation';

const useRandomInterval = (
  callback: () => void,
  minDelay: number | null,
  maxDelay: number | null
) => {
  const timeoutId = React.useRef<number | null>(null);
  const savedCallback = React.useRef(callback);
  React.useEffect(() => {
    savedCallback.current = callback;
  });
  React.useEffect(() => {
    const isEnabled =
      typeof minDelay === 'number' && typeof maxDelay === 'number';
    if (isEnabled) {
      const handleTick = () => {
        const nextTickAt = random(minDelay, maxDelay);
        timeoutId.current = window.setTimeout(() => {
          savedCallback.current();
          handleTick();
        }, nextTickAt);
      };
      handleTick();
    }
    return () => {
      if (timeoutId.current != null) {
        window.clearTimeout(timeoutId.current);
      }
    };
  }, [minDelay, maxDelay]);
  const cancel = React.useCallback(() => {
    if (timeoutId.current != null) {
      window.clearTimeout(timeoutId.current);
    }
  }, []);
  return cancel;
};

export default useRandomInterval;
