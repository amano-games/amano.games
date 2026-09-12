'use client';

import { useEffect, type ReactNode } from 'react';
import classNames from 'classnames';
import { useInView } from 'react-intersection-observer';
import { useWindowSize } from '@reach/window-size';
import { usePathname } from 'next/navigation';

import NavLink from 'components/nav-link';
import pathActive from 'components/nav-link/path-active';
import Navigation from './navigation';
import './styles.css';

type Props = {
  href: string;
  refId?: string;
  className?: string;
  children: ReactNode;
  navigation?: Navigation;
};

function Route({
  className,
  children,
  href,
  refId,
  navigation = Navigation.Client,
}: Props) {
  const pathname = usePathname();
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
  const label = <span>{children}</span>;

  const link =
    navigation === Navigation.Document ? (
      <a
        href={href}
        className={customClassName}
        data-active={pathActive(pathname, href)}
      >
        {label}
      </a>
    ) : (
      <NavLink href={href} className={customClassName} data-in-view={inView}>
        {label}
      </NavLink>
    );

  return link;
}

export default Route;
