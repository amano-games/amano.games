import type { CSSProperties } from 'react';

type Props = {
  size: number;
  color: string;
  style: CSSProperties;
};

function Sparkle({ size, color, style }: Props) {
  return (
    <span style={style} className="c-sparkle-wrapper">
      <svg
        className="c-sparkle-svg"
        width={size}
        height={size}
        viewBox="0 0 64 100.2"
        fill="none"
      >
        <polygon points="64,48.5 32,100.2 0,48.5 32,0 " fill={color} />
      </svg>
    </span>
  );
}

export default Sparkle;
