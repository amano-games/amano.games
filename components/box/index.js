import PropTypes from 'prop-types';
import classNames from 'classnames';

import style from './style.module.css';

function Box({ className, children, inverted }) {
  const customClassName = classNames(style.box, 'box', className, {
    [style['-inverted']]: inverted,
  });
  return <div className={customClassName}>{children}</div>;
}

Box.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  inverted: PropTypes.bool,
};

Box.defaultProps = {
  className: null,
  inverted: false,
};

export default Box;
