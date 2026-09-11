import type { ReactNode } from 'react';

import Header from 'components/header';
import { gameStaticParams } from 'lib/game';

export const dynamic = 'force-static';

export async function generateStaticParams() {
  return gameStaticParams();
}

type Props = {
  children: ReactNode;
};

export default function GameLayout({ children }: Props) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}
