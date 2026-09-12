function formatBytes(bytes?: number | null, decimals = 1) {
  if (!bytes || bytes === 0) return '0 B';

  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const value = bytes / k ** i;

  return `${value.toFixed(decimals)} ${sizes[i]}`;
}

export default formatBytes;
