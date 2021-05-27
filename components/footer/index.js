import Link from 'next/link';

import Fingers from 'svg/fingers1.svg';

import style from './style.module.css';

const year = new Date().getFullYear();

function Footer() {
  return (
    <footer id="footer" className={`${style.footer}`}>
      <div className={`${style['footer-wrapper']} wrapper`}>
        <Fingers className={style['footer-hand']} />
        <div className={style['footer-info']}>
          <p>
            © <time>{year}</time> by Amano
          </p>
          <Link href="/devlog">
            <a>Devlog</a>
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
