/* eslint filenames/match-exported: 0 */

import Seo from 'components/seo';

import Logo from 'svg/logo.svg';
import styles from './style.module.css';

export default function Home() {
  return (
    <>
      <Seo />
      <main className={styles['home-wrapper']}>
        <div className={`wrapper ${styles['home-sub-wrapper']}`}>
          <Logo src="/logo.png" alt="Amano" className={styles.logo} />
          <p>Coming soon</p>
        </div>
      </main>
    </>
  );
}
