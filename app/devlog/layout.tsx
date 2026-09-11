import type { ReactNode } from 'react';

import { LayoutDevlog } from 'components/layouts';

export const dynamic = 'force-static';

type Props = {
  children: ReactNode;
};

export default function DevlogLayout({ children }: Props) {
  return <LayoutDevlog>{children}</LayoutDevlog>;
}
