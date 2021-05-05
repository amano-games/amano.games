import Hand from 'svg/hand.svg';

import style from './style.module.css';

const year = new Date().getFullYear();

function Footer() {
  return (
    <footer id="footer" className={`${style.footer} wrapper`}>
      <Hand className={style['footer-hand']} />
      <div className={`${style['footer-wrapper']} wrapper`}>
        © {year} by Amano
      </div>
    </footer>
  );
}

export default Footer;
