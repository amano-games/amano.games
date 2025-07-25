import PropTypes from 'prop-types';
import classNames from 'classnames';

import Mask from 'svg/mask.svg';

import style from './style.module.css';

function Avatar({ className = null, flipped = false, src, alt }) {
  const customClassName = classNames(style.avatar, 'avatar', className, {
    [style['-flipped']]: flipped,
  });
  return (
    <div className={customClassName}>
      <Mask className={style['avatar-background']} />
      <img src={src} alt={alt} className={style['avatar-image']} />
      <svg width="0" height="0">
        <defs>
          <clipPath id="svgClip" clipPathUnits="objectBoundingBox">
            <path d="M.4 0L.1.2 0 .5l.1.3.4.2.4-.2.1-.4L.9.1z" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

Avatar.propTypes = {
  className: PropTypes.string,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  flipped: PropTypes.bool,
};

export default Avatar;
