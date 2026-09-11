import type { HTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';
import './styles.css';

type Props = {
  className?: string;
  children: ReactNode;
  inverted?: boolean;
} & HTMLAttributes<HTMLDivElement>;

function Box({ className, children, inverted = false, ...rest }: Props) {
  const customClassName = classNames('c-box', className, {
    'c-box-inverted': inverted,
  });
  return (
    <div className={customClassName} {...rest}>
      {children}
    </div>
  );
}

export default Box;
