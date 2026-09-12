type Props = {
  src: string;
  alt: string;
  styleWidth?: string | number;
};

function PresskitAssetImg({ src, alt, styleWidth }: Props) {
  return (
    <img
      loading="lazy"
      style={styleWidth ? { maxWidth: styleWidth } : undefined}
      src={src}
      alt={alt}
    />
  );
}

export default PresskitAssetImg;
