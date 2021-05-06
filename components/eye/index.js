import { useState } from 'react';
import classNames from 'classnames';
import Lottie from 'react-lottie-player';
import PropTypes from 'prop-types';
import useSound from 'use-sound';
import Link from 'next/link';

import style from './style.module.css';

import animation from './eye.json';

const sfx = '/sfx/eye.mp3';

const openSegments = [0, 10];
const closeSegments = [12, 22];

function CustomLink({ href, children, ...rest }) {
  return (
    <Link href={href}>
      <a {...rest}>{children}</a>
    </Link>
  );
}

CustomLink.propTypes = {
  href: PropTypes.isRequired,
  children: PropTypes.isRequired,
};

function getWrapper(href) {
  // eslint-disable-next-line jsx-a11y/anchor-has-content
  if (href) return (props) => <CustomLink {...props} />;
  return (props) => <button {...props} type="button" />;
}

function Eye({ className, href, onClick, ...rest }) {
  const [play] = useSound(sfx);
  const [anim, setAnim] = useState(openSegments);
  const customClassName = classNames(style.eye, 'eye', className);

  const Wrapper = getWrapper(href);

  return (
    <Wrapper
      href={href}
      className={customClassName}
      onClick={() => {
        play();
        setAnim(closeSegments);
        onClick();
      }}
    >
      <Lottie
        {...rest}
        animationData={animation}
        segments={anim}
        onComplete={() => {
          if (anim === closeSegments) {
            setAnim(openSegments);
          }
        }}
        loop={false}
        play
      />
    </Wrapper>
  );
}

Eye.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  href: PropTypes.string,
};

Eye.defaultProps = {
  className: null,
  onClick: () => {},
  href: null,
};

export default Eye;
