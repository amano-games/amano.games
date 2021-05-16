import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import NavLink from 'components/nav-link';

import style from './style.module.css';

function Route({ className, children, href, refId }) {
  const { ref, inView } = useInView({
    threshold: 0.6,
  });

  useEffect(() => {
    const el = document.getElementById(refId);
    ref(el);
  }, []);

  console.log(refId, inView);
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
