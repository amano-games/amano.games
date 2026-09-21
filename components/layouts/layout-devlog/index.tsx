import type { ReactNode } from 'react';
import Link from 'next/link';

import EyesWrap from 'components/eyes-wrap';
import Header from 'components/header';
import Footer from 'components/footer';

import Hand from 'svg/hand.svg';
import Text from 'svg/text.svg';
import './styles.css';

type Props = {
  children?: ReactNode;
};

function LayoutDevlog({ children = null }: Props) {
  return (
    <>
      <Header />
      <header className="c-layout-devlog-header">
        <div className="c-layout-devlog-wrapper c-layout-devlog-header-wrapper wrapper">
          <Link href="/" className="c-layout-devlog-logo">
            <Hand className="c-layout-devlog-hand" />
            <Text className="c-layout-devlog-text" />
          </Link>
          <h1 className="c-layout-devlog-title">
            <Link href="/devlog" className="c-layout-devlog-logo">
              Devlog
            </Link>
          </h1>
        </div>
      </header>
      <EyesWrap>
        <main className="c-layout-devlog-posts">{children}</main>
      </EyesWrap>
      <Footer />
    </>
  );
}

export default LayoutDevlog;
