import DOMPurify from 'dompurify';
import reactStringReplace from 'react-string-replace';

export const HOST = 'mastodon.gamedev.place';
export const USERNAME = '@amano@mastodon.gamedev.place';

export function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function emojify(input, emojis) {
  let output = input;

  emojis.forEach((emoji) => {
    output = reactStringReplace(output, `:${emoji.shortcode}:`, (_, i) => (
      <picture className="emoji-wrapper" key={`${emoji.shortcode}-${i}`}>
        <source
          srcSet={escapeHtml(emoji.url)}
          media="(prefers-reduced-motion: no-preference)"
        />
        <img
          src={escapeHtml(emoji.static_url)}
          alt={emoji.shortcode}
          title={emoji.shortcode}
          width="20"
          height="20"
          className="emoji"
        />
      </picture>
    ));
  });

  return output;
}

export function getDisplayName({
  display_name: displayName,
  username,
  emojis,
}) {
  if (displayName.length > 0) {
    const scaped = escapeHtml(displayName);
    return emojify(scaped, emojis);
  }

  return username;
}

export function getInstance({ acct }, host = HOST) {
  if (acct.includes('@')) {
    return acct.split('@')[1];
  }

  return host;
}

export async function getComments({ id, host, username }) {
  const url = `https://${host}/api/v1/statuses/${id}/context`;
  const res = await fetch(url);
  const data = await res.json();

  const { descendants } = data;

  if (!descendants) return [];
  if (!Array.isArray) return [];
  return descendants.map((item) => {
    const accountInstance = getInstance(item.account, host);
    const accountHandle = `@${item.account.username}@${accountInstance}`;

    return {
      id: item.id,
      url: item.url,
      displayName: getDisplayName(item.account),
      isReply: item.in_reply_to_id !== id,
      isOp: item.account.acct === username,
      content: DOMPurify.sanitize(emojify(item.content, item.emojis)),
      avatarSrc: escapeHtml(item.account.avatar),
      avatarStaticSrc: escapeHtml(item.account.avatar_static),
      avatarAlt: `${accountHandle} avatar`,
      accountHandle,
      accountInstance,
      accountUrl: item.account.url,
      createdAt: item.created_at,
      favouritesCount: item.favourites_count,
    };
  });
}
