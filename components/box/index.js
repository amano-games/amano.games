import PropTypes from 'prop-types';
import classNames from 'classnames';

import style from './style.module.css';

function Box({ className, children }) {
  const customClassName = classNames(style.box, 'box', className);
  return <div className={customClassName}>{children}</div>;
}

Box.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Box.defaultProps = {
  className: null,
};

export default Box;
