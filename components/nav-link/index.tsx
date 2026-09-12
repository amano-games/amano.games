'use client';

import type { ComponentProps } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

type Props = ComponentProps<typeof Link>;

function NavLink({ children = null, className, ...rest }: Props) {
  const pathname = usePathname();

  return (
    <Link
      {...rest}
      className={className}
      data-active={pathname === rest.href}
      scroll
    >
      {children}
    </Link>
  );
}

export default NavLink;
