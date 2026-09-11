import { useEffect, type ReactNode } from 'react';
import classNames from 'classnames';
import { useInView } from 'react-intersection-observer';
import { useWindowSize } from '@reach/window-size';

import NavLink from 'components/nav-link';

type Props = {
  href: string;
  refId?: string;
  className?: string;
  children: ReactNode;
};

function Route({ className, children, href, refId }: Props) {
  const { width } = useWindowSize();
  const { ref, inView } = useInView({
    threshold: width > 900 ? 0.4 : undefined,
  });

  useEffect(() => {
    if (refId) {
      const el = document.getElementById(refId);
      ref(el);
    }
  }, [refId]);

  const customClassName = classNames('c-route', className);

  return (
    <NavLink href={href} className={customClassName} data-in-view={inView}>
      <span>{children}</span>
    </NavLink>
  );
}

export default Route;
