import classNames from 'classnames';

import Mask from 'svg/mask.svg';
import './styles.css';

type Props = {
  className?: string;
  src: string;
  alt: string;
  flipped?: boolean;
};

function Avatar({ className, flipped = false, src, alt }: Props) {
  const customClassName = classNames('c-avatar', className, {
    'c-avatar-flipped': flipped,
  });
  return (
    <div className={customClassName}>
      <Mask className="c-avatar-background" />
      <img src={src} alt={alt} className="c-avatar-image" />
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

export default Avatar;
