import DOMPurify from 'dompurify';
import type { ReactNode } from 'react';
import reactStringReplace from 'react-string-replace';

import type { CommentData } from 'components/comment';

export const HOST = 'mastodon.gamedev.place';
export const USERNAME = '@amano@mastodon.gamedev.place';

type MastodonEmoji = {
  shortcode: string;
  url: string;
  static_url: string;
};

type MastodonAccount = {
  display_name: string;
  username: string;
  emojis: MastodonEmoji[];
  acct: string;
  avatar: string;
  avatar_static: string;
  url: string;
};

type MastodonStatus = {
  id: string;
  url: string;
  in_reply_to_id: string | null;
  content: string;
  emojis: MastodonEmoji[];
  account: MastodonAccount;
  created_at: string;
  favourites_count: number;
};

export function escapeHtml(unsafe: string) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function emojify(input: string, emojis: MastodonEmoji[]): ReactNode {
  let output: string | ReactNode[] = input;

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
}: MastodonAccount) {
  if (displayName.length > 0) {
    const scaped = escapeHtml(displayName);
    return emojify(scaped, emojis);
  }

  return username;
}

export function getInstance({ acct }: MastodonAccount, host = HOST) {
  if (acct.includes('@')) {
    return acct.split('@')[1];
  }

  return host;
}

export async function getComments({
  id,
  host,
  username,
}: {
  id: string;
  host: string;
  username: string;
}): Promise<CommentData[]> {
  const url = `https://${host}/api/v1/statuses/${id}/context`;
  const res = await fetch(url);
  const data = await res.json();

  const { descendants } = data as { descendants?: MastodonStatus[] };

  if (!descendants) return [];
  if (!Array.isArray(descendants)) return [];
  return descendants.map((item) => {
    const accountInstance = getInstance(item.account, host);
    const accountHandle = `@${item.account.username}@${accountInstance}`;
    const emojified = emojify(item.content, item.emojis);

    return {
      id: item.id,
      url: item.url,
      displayName: getDisplayName(item.account),
      isReply: item.in_reply_to_id !== id,
      isOp: item.account.acct === username,
      content: DOMPurify.sanitize(
        typeof emojified === 'string' ? emojified : item.content
      ),
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
