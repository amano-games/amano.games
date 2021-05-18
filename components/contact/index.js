import Sparkles from 'components/sparkles';
import Social from 'components/social';

import { email } from 'constants/site';

import style from './style.module.css';

function Contact() {
  return (
    <section className={`${style.contact} -inverted`} id="contact">
      <div className="wrapper">
        <div>
          <span className={style['contact-message']}>
            Get in touch with us at
          </span>
        </div>
        <Sparkles>
          <a className={style['contact-email']} href={`mailto:${email}`}>
            {email}
          </a>
        </Sparkles>
        <div>
          <span className={style['contact-message']}>
            ... or through our social media
          </span>
          <Social />
        </div>
      </div>
    </section>
  );
}

export default Contact;
