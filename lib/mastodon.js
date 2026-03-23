export function parseMastodonHandle(handle) {
  // accepts "@user@instance.tld" or "user@instance.tld"
  const clean = handle.startsWith('@') ? handle.slice(1) : handle;
  const [username, instance] = clean.split('@');

  if (!username || !instance) {
    throw new Error('Invalid Mastodon handle');
  }

  return { username, instance };
}
