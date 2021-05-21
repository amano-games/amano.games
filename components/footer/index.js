import Fingers from 'svg/fingers1.svg';

import style from './style.module.css';

const year = new Date().getFullYear();

function Footer() {
  return (
    <footer id="footer" className={`${style.footer}`}>
      <div className={`${style['footer-wrapper']} wrapper`}>
        <Fingers className={style['footer-hand']} />
        <p>
          © <time>{year}</time> by Amano
        </p>
      </div>
    </footer>
  );
}

export default Footer;
