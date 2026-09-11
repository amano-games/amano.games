import type { HTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';

import style from './style.module.css';

type Props = {
  className?: string;
  children: ReactNode;
  inverted?: boolean;
} & HTMLAttributes<HTMLDivElement>;

function Box({ className, children, inverted = false, ...rest }: Props) {
  const customClassName = classNames(style.box, 'box', className, {
    [style['-inverted']]: inverted,
  });
  return (
    <div className={customClassName} {...rest}>
      {children}
    </div>
  );
}

export default Box;
