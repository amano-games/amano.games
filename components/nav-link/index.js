import React, { Children } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import Link from 'next/link';

function NavLink({ router, children, activeClassName, ...rest }) {
  const child = Children.only(children);

  let className = child.props.className || '';
  if (router.pathname === rest.href && activeClassName) {
    className = `${className} ${activeClassName}`.trim();
  }

  return <Link {...rest}>{React.cloneElement(child, { className })}</Link>;
}

NavLink.propTypes = {
  activeClassName: PropTypes.string,
  children: PropTypes.node,
  router: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

NavLink.defaultProps = {
  activeClassName: '-active',
  children: null,
};

export default withRouter(NavLink);
