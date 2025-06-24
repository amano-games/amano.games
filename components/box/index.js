import PropTypes from 'prop-types';
import classNames from 'classnames';

import style from './style.module.css';

function Box({ className = null, children, inverted = false, ...rest }) {
  const customClassName = classNames(style.box, 'box', className, {
    [style['-inverted']]: inverted,
  });
  return (
    <div className={customClassName} {...rest}>
      {children}
    </div>
  );
}

Box.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  inverted: PropTypes.bool,
};

export default Box;
