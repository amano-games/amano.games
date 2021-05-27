import PropTypes from 'prop-types';
import Link from 'next/link';

import { getAllPosts } from 'lib/api';

import EyesWrap from 'components/eyes-wrap';
import Seo from 'components/seo';
import Footer from 'components/footer';
import Post from 'components/post';

import Hand from 'svg/hand.svg';
import Text from 'svg/text.svg';

import style from './style.module.css';

function Devlog({ allPosts }) {
  return (
    <>
      <Seo />
      <header className={style['devlog-header']}>
        <div
          className={`${style['devlog-wrapper']} ${style['devlog-header-wrapper']} wrapper`}
        >
          <Link href="/">
            <a className={style['devlog-logo']}>
              <Hand className={style['devlog-hand']} />
              <Text className={style['devlog-text']} />
            </a>
          </Link>
          <h1 className={style['devlog-title']}>Devlog</h1>
        </div>
      </header>
      <EyesWrap>
        <main className={style['devlog-posts']}>
          <div className={`${style['devlog-wrapper']} wrapper`}>
            {allPosts.map((item) => {
              return <Post {...item} key={item.slug} />;
            })}
          </div>
        </main>
      </EyesWrap>
      <Footer />
    </>
  );
}

Devlog.propTypes = {
  allPosts: PropTypes.arrayOf(PropTypes.shape({})),
};

Devlog.defaultProps = {
  allPosts: [],
};

export async function getStaticProps() {
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
    'content',
    'tags',
  ]);

  return {
    props: { allPosts },
  };
}

export default Devlog;
