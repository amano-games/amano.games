import type { ReactNode } from 'react';
import classNames from 'classnames';

import style from './style.module.css';

type Props = {
  children?: ReactNode;
  className?: string;
};

function RichText({ children = null, className }: Props) {
  const customClassName = classNames(
    style['rich-text-container'],
    'rich-text-container',
    className
  );

  return <div className={customClassName}>{children}</div>;
}

export default RichText;
