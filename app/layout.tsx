import type { ReactNode } from 'react';
import type { Metadata } from 'next';

import 'styles/variables.css';
import 'styles/globals.css';
import { createMetadata, defaultViewport } from 'lib/metadata';

export const dynamic = 'force-static';

export const metadata: Metadata = createMetadata({ path: '/' });

export const viewport = defaultViewport;

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
