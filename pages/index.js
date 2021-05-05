/* eslint filenames/match-exported: 0 */

import Seo from 'components/seo';
import Scene from 'components/scene';

import styles from './style.module.css';

export default function Home() {
  return (
    <>
      <Seo />
      <main className={styles['home-wrapper']}>
        <Scene />
      </main>
    </>
  );
}
