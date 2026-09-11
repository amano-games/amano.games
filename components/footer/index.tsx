import Link from 'next/link';

import Social from 'components/social';
import Fingers from 'svg/fingers1.svg';

const year = new Date().getFullYear();

type Props = {
  showSocial?: boolean;
};

function Footer({ showSocial = true }: Props) {
  return (
    <footer id="footer" className="c-footer">
      <div className="c-footer-wrapper wrapper">
        <Fingers className="c-footer-hand" />
        <div className="c-footer-info-wrapper">
          <div className="c-footer-info">
            <p className="c-footer-copy">
              © <time>{year}</time> by Amano
            </p>
            <Link href="/newsletter" className="c-footer-newsletter-link">
              Newsletter
            </Link>
            <Link href="/devlog" className="c-footer-devlog">
              Devlog
            </Link>
            {showSocial ? <Social className="c-footer-social" /> : null}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
