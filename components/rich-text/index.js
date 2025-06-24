import PropTypes from 'prop-types';
import classNames from 'classnames';

import style from './style.module.css';

function RichText({ children = null, className = null }) {
  const customClassName = classNames(
    style['rich-text-container'],
    'rich-text-container',
    className
  );

  return <div className={customClassName}>{children}</div>;
}

RichText.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default RichText;
