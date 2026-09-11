import type { ReactNode } from 'react';
import classNames from 'classnames';

import { bsky, email, itch, mastodon } from 'lib/site';
import { parseMastodonHandle } from 'lib/mastodon';

import Itch from 'svg/itch.svg';
import Mail from 'svg/mail.svg';
import Fediverse from 'svg/fediverse.svg';
import Bsky from 'svg/bsky.svg';

type SocialItem = {
  label: string;
  href: string;
  icon: ReactNode;
};

type Props = {
  className?: string;
  size?: string;
  filter?: (item: SocialItem) => boolean;
};

function Social({ className, size = 'm', filter = () => true }: Props) {
  const customClassName = classNames('c-social', className, {
    'c-social-l': size === 'l',
  });
  const mastodonData = parseMastodonHandle(mastodon);
  const social: SocialItem[] = [
    {
      label: 'fediverse',
      href: `https://${mastodonData.instance}/@${mastodonData.username}`,
      icon: <Fediverse />,
    },
    {
      label: 'bluesky',
      href: `https://bsky.app/profile/${bsky}`,
      icon: <Bsky />,
    },
    {
      label: 'itch.io',
      href: itch,
      icon: <Itch />,
    },
    {
      label: 'email',
      href: `mailto:${email}`,
      icon: <Mail />,
    },
  ];
  return (
    <ul className={customClassName}>
      {social?.filter(filter).map((item) => {
        return (
          <li key={item.label}>
            <a
              rel="noopener noreferrer"
              target="_blank"
              href={item.href}
              aria-label={item.label}
            >
              {item.icon}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export default Social;
