import classNames from 'classnames';

import Logo from 'svg/logo.svg';

import style from './style.module.css';

type Props = {
  className?: string;
};

function FakeScene({ className }: Props) {
  const customClassName = classNames(
    style['fake-scene'],
    'fake-scene',
    className
  );
  return (
    <div className={customClassName}>
      <Logo />
    </div>
  );
}

export default FakeScene;
