import { imageSize } from 'image-size';

export function isFormatVideo(format) {
  return format === 'mp4' || format === 'vod';
}

export function isFormatImage(format) {
  return (
    format === 'jpeg' ||
    format === 'png' ||
    format === 'svg' ||
    format === 'gif'
  );
}

export function getFormat(url, contentType) {
  let format = contentType?.split('/')[1] || url.split('.').pop();

  if (format?.includes('+')) {
    [format] = format.split('+');
  }

  if (format === 'jpeg') {
    format = 'jpg';
  }
  return format;
}

export async function getAssetMeta(url) {
  const res = await fetch(url);
  const contentType = res.headers.get('content-type');
  const buffer = Buffer.from(await res.arrayBuffer());

  const bytes = buffer.length;
  const format = getFormat(url, contentType);

  return {
    bytes,
    format,
  };
}

export async function getImageMeta(url) {
  const res = await fetch(url);
  const contentType = res.headers.get('content-type');
  const buffer = Buffer.from(await res.arrayBuffer());

  const bytes = buffer.length;
  const format = getFormat(url, contentType);

  let width = null;
  let height = null;

  if (isFormatImage(format)) {
    const dimensions = imageSize(buffer);
    width = dimensions.width;
    height = dimensions.height;
  }

  return {
    bytes,
    format,
    width,
    height,
  };
}
