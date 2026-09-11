import type { ReactNode } from 'react';
import 'modern-css-reset';

import 'styles/variables.css';
import 'styles/globals.css';
import { createMetadata, defaultViewport } from 'lib/metadata';

export const dynamic = 'force-static';

export const metadata = createMetadata({ path: '/' });

export const viewport = defaultViewport;

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
