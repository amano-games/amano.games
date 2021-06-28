import PropTypes from 'prop-types';
import classNames from 'classnames';

import { twitter, email, itch } from 'lib/site';

import Itch from 'svg/itch.svg';
import Twitter from 'svg/twitter.svg';
import Mail from 'svg/mail.svg';

import style from './style.module.css';

const social = [
  {
    label: 'twitter',
    href: `https://twitter.com/${twitter}`,
    icon: <Twitter />,
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

function Social({ className, size, filter }) {
  const customClassName = classNames(style.social, 'social', className, [
    style[`-${size}`],
  ]);
  return (
    <ul className={customClassName}>
      {social.filter(filter).map((item) => {
        return (
          <li key={item.label}>
            <a rel="noopener noreferrer" target="_blank" href={item.href}>
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

Social.defaultProps = {
  className: null,
  size: 'm',
  filter: () => true,
};

export default Social;
