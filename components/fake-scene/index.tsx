import classNames from 'classnames';

import Logo from 'svg/logo.svg';

type Props = {
  className?: string;
};

function FakeScene({ className }: Props) {
  const customClassName = classNames('c-fake-scene', className);
  return (
    <div className={customClassName}>
      <Logo />
    </div>
  );
}

export default FakeScene;
