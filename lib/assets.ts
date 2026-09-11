import { imageSize } from 'image-size';

export function isFormatVideo(format: string) {
  return format === 'mp4' || format === 'vod';
}

export function isFormatImage(format?: string | null) {
  return (
    format === 'jpeg' ||
    format === 'png' ||
    format === 'svg' ||
    format === 'gif'
  );
}

export function getFormat(url: string, contentType: string | null) {
  let format = contentType?.split('/')[1] || url.split('.').pop();

  if (format?.includes('+')) {
    [format] = format.split('+');
  }

  if (format === 'jpeg') {
    format = 'jpg';
  }

  return format;
}

export async function getAssetMeta(url: string) {
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

export async function getImageMeta(url: string) {
  const res = await fetch(url);
  const contentType = res.headers.get('content-type');
  const buffer = Buffer.from(await res.arrayBuffer());

  const bytes = buffer.length;
  const format = getFormat(url, contentType);

  let width: number | null = null;
  let height: number | null = null;

  if (isFormatImage(format)) {
    const dimensions = imageSize(buffer);
    width = dimensions.width ?? null;
    height = dimensions.height ?? null;
  }

  return {
    bytes,
    format,
    width,
    height,
  };
}
