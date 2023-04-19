import PropTypes from 'prop-types';
import Link from 'next/link';

import Social from 'components/social';
import Fingers from 'svg/fingers1.svg';

import style from './style.module.css';

const year = new Date().getFullYear();

function Footer({ showSocial }) {
  return (
    <footer id="footer" className={`${style.footer}`}>
      <div className={`${style['footer-wrapper']} wrapper`}>
        <Fingers className={style['footer-hand']} />
        <div className={style['footer-info']}>
          <p className={style['footer-copy']}>
            © <time>{year}</time> by Amano
          </p>
          <Link href="/devlog" className={style['footer-devlog']}>
            Devlog
          </Link>
          {showSocial ? <Social className={style['footer-social']} /> : null}
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  showSocial: PropTypes.bool,
};

Footer.defaultProps = {
  showSocial: true,
};

export default Footer;
