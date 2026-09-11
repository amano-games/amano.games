import type { ComponentProps } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

type Props = ComponentProps<typeof Link>;

function NavLink({ children = null, className, ...rest }: Props) {
  const router = useRouter();
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

export default NavLink;
