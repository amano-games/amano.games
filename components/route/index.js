import { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useInView } from 'react-intersection-observer';
import { useWindowSize } from '@reach/window-size';

import NavLink from 'components/nav-link';

import style from './style.module.css';

function Route({ className, children, href, refId }) {
  const { width } = useWindowSize();
  const { ref, inView } = useInView({
    threshold: width > 900 ? 0.4 : null,
  });

  useEffect(() => {
    const el = document.getElementById(refId);
    ref(el);
  }, []);

  const customClassName = classNames(style.route, 'route', className, {
    [style['-active']]: inView,
  });

  return (
    <NavLink href={href}>
      <a className={customClassName}>
        <span>{children}</span>
      </a>
    </NavLink>
  );
}

Route.propTypes = {
  href: PropTypes.string.isRequired,
  refId: PropTypes.string.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Route.defaultProps = {
  className: null,
};

export default Route;
