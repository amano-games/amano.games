/* eslint filenames/match-exported: 0 */

import Seo from 'components/seo';

import styles from './style.module.css';

export default function Home() {
  return (
    <>
      <Seo />
      <main className={styles['home-wrapper']}>
        <div className={`wrapper ${styles['home-sub-wrapper']}`}>
          <img
            src="/logo.png"
            alt="Vercel Logo"
            width={1898}
            height={1898}
            className={styles.logo}
          />
          <p>Coming soon</p>
        </div>
      </main>
    </>
  );
}
