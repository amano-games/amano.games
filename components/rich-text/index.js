import PropTypes from 'prop-types';
import classNames from 'classnames';

import style from './style.module.css';

function RichText({ children, className }) {
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

RichText.defaultProps = {
  children: null,
  className: null,
};

export default RichText;
