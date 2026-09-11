import type { ReactNode } from 'react';
import classNames from 'classnames';

type Props = {
  children?: ReactNode;
  className?: string;
};

function RichText({ children = null, className }: Props) {
  const customClassName = classNames('c-rich-text', className);

  return <div className={customClassName}>{children}</div>;
}

export default RichText;
