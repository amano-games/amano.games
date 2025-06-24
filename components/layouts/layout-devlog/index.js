import PropTypes from 'prop-types';
import Link from 'next/link';

import EyesWrap from 'components/eyes-wrap';
import Seo from 'components/seo';
import Header from 'components/header';
import Footer from 'components/footer';

import Hand from 'svg/hand.svg';
import Text from 'svg/text.svg';

import style from './style.module.css';

function LayoutDevlog({ children = null }) {
  return (
    <>
      <Seo title="AMANO Devlog" image="/devlog-preview.png" />
      <Header />
      <header className={style['devlog-header']}>
        <div
          className={`${style['devlog-wrapper']} ${style['devlog-header-wrapper']} wrapper`}
        >
          <Link href="/" className={style['devlog-logo']}>
            <Hand className={style['devlog-hand']} />
            <Text className={style['devlog-text']} />
          </Link>
          <h1 className={style['devlog-title']}>
            <Link href="/devlog" className={style['devlog-logo']}>
              Devlog
            </Link>
          </h1>
        </div>
      </header>
      <EyesWrap>
        <main className={style['devlog-posts']}>{children}</main>
      </EyesWrap>
      <Footer />
    </>
  );
}

LayoutDevlog.propTypes = {
  children: PropTypes.node,
};

export default LayoutDevlog;
