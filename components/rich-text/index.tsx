import type { ReactNode } from 'react';
import classNames from 'classnames';
import './styles.css';

type Props = {
  children?: ReactNode;
  className?: string;
};

function RichText({ children = null, className }: Props) {
  const customClassName = classNames('c-rich-text', className);

  return <div className={customClassName}>{children}</div>;
}

export default RichText;
