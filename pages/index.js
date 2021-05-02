/* eslint filenames/match-exported: 0 */

import Head from 'next/head';

import styles from './style.module.css';

export default function Home() {
  return (
    <>
      <Head>
        <title>amano.games</title>
        <meta name="description" content="Games made by hand" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles['home-wrapper']}>
        <div className={`wrapper ${styles['home-sub-wrapper']}`}>
          <img
            src="/logo.png"
            alt="Vercel Logo"
            width={1898}
            height={1898}
            className={styles.logo}
          />
        </div>
      </main>
    </>
  );
}
