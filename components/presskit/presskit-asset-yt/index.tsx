type Props = {
  title: string;
  youtube: string;
};

function PresskitAssetYt({ title, youtube }: Props) {
  return (
    <iframe
      className="c-presskit-assets-yt-iframe"
      title={title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      src={`https://www.youtube.com/embed/${youtube}`}
      referrerPolicy="strict-origin-when-cross-origin"
      allowFullScreen
    />
  );
}

export default PresskitAssetYt;
