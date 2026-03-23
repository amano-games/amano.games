import { imageSize } from 'image-size';

export function isFormatImage(format) {
  return (
    format === 'jpeg' ||
    format === 'png' ||
    format === 'svg' ||
    format === 'gif'
  );
}

export async function getImageMeta(url) {
  const res = await fetch(url);
  const buffer = Buffer.from(await res.arrayBuffer());

  const bytes = buffer.length;

  const contentType = res.headers.get('content-type');

  let format = contentType?.split('/')[1] || url.split('.').pop();

  if (format?.includes('+')) {
    [format] = format.split('+');
  }

  if (format === 'jpeg') format = 'jpg';

  let width = null;
  let height = null;

  if (isFormatImage(format)) {
    const dimensions = imageSize(buffer);
    width = dimensions.width;
    height = dimensions.height;
  }

  return {
    bytes,
    width,
    height,
    format,
  };
}
