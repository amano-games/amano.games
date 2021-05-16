import PropTypes from 'prop-types';
import classNames from 'classnames';

import Itch from 'svg/itch.svg';
import Twitter from 'svg/twitter.svg';

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
];

function Social({ className }) {
  const customClassName = classNames(style.social, 'social', className);
  return (
    <ul className={customClassName}>
      {social.map((item) => {
        return (
          <li key={item.label}>
            <a href={item.href}>{item.icon}</a>
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
