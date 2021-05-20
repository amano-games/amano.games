import PropTypes from 'prop-types';
import classNames from 'classnames';

import Mask from 'svg/mask.svg';

import style from './style.module.css';

function Avatar({ className, flipped, src, alt }) {
  const customClassName = classNames(style.avatar, 'avatar', className, {
    [style['-flipped']]: flipped,
  });
  return (
    <div className={customClassName}>
      <img
        src={src}
        alt={alt}
        className={style['avatar-image']}
        style={{
          clipPath: 'path(M.4 0L.1.2 0 .5l.1.3.4.2.4-.2.1-.4L.9.1z)',
        }}
      />
      <Mask className={style['avatar-background']} />
      <svg width="0" height="0">
        <clipPath id="svgClip" clipPathUnits="objectBoundingBox">
          <path d="M.4 0L.1.2 0 .5l.1.3.4.2.4-.2.1-.4L.9.1z" />
        </clipPath>
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

Avatar.defaultProps = {
  className: null,
  flipped: false,
};

export default Avatar;
