import PropTypes from 'prop-types';
import classNames from 'classnames';

import { email } from 'constants/site';

import Itch from 'svg/itch.svg';
import Twitter from 'svg/twitter.svg';
import Mail from 'svg/mail.svg';

import style from './style.module.css';

const social = [
  {
    label: 'twitter',
    href: 'https://twitter.com/gamesamano',
    icon: <Twitter />,
  },
  {
    label: 'itch.io',
    href: 'https://amanogames.itch.io/',
    icon: <Itch />,
  },
  {
    label: 'email',
    href: `mailto:${email}`,
    icon: <Mail />,
  },
];

function Social({ className }) {
  const customClassName = classNames(style.social, 'social', className);
  return (
    <ul className={customClassName}>
      {social.map((item) => {
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
};

Social.defaultProps = {
  className: null,
};

export default Social;
