import { useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useInView } from 'react-intersection-observer';
import { useWindowSize } from '@reach/window-size';

import NavLink from 'components/nav-link';

import style from './style.module.css';

function Route({ className = null, children, href, refId = null }) {
  const { width } = useWindowSize();
  const { ref, inView } = useInView({
    threshold: width > 900 ? 0.4 : null,
  });

  useEffect(() => {
    if (refId) {
      const el = document.getElementById(refId);
      ref(el);
    }
  }, [refId]);

  const customClassName = classNames(style.route, 'route', className);

  return (
    <NavLink href={href} className={customClassName} data-in-view={inView}>
      <span>{children}</span>
    </NavLink>
  );
}

Route.propTypes = {
  href: PropTypes.string.isRequired,
  refId: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Route;
