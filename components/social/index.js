import PropTypes from 'prop-types';
import classNames from 'classnames';

import { bsky, email, itch } from 'lib/site';

import Itch from 'svg/itch.svg';
import Mail from 'svg/mail.svg';
import Fediverse from 'svg/fediverse.svg';
import Bsky from 'svg/bsky.svg';

import style from './style.module.css';

const social = [
  {
    label: 'fediverse',
    href: `https://mastodon.gamedev.place/@amano`,
    icon: <Fediverse />,
  },
  {
    label: 'bluesky',
    href: `https://bsky.app/profile/${bsky}`,
    icon: <Bsky />,
  },
  // {
  //   label: 'twitter',
  //   href: `https://twitter.com/${twitter}`,
  //   icon: <Twitter />,
  // },
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

function Social({ className, size = 'm', filter = () => true }) {
  const customClassName = classNames(style.social, 'social', className, [
    style[`-${size}`],
  ]);
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

Social.propTypes = {
  className: PropTypes.string,
  size: PropTypes.string,
  filter: PropTypes.func,
};

export default Social;
