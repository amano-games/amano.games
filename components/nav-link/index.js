import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import Link from 'next/link';

function NavLink({ router, children, className, ...rest }) {
  return (
    <Link
      {...rest}
      className={className}
      data-active={router.pathname === rest.href}
    >
      {children}
    </Link>
  );
}

NavLink.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  router: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

NavLink.defaultProps = {
  className: null,
  children: null,
};

export default withRouter(NavLink);
