import Sparkles from 'components/sparkles';
import Social from 'components/social';

import { email } from 'lib/site';

import style from './style.module.css';

function Contact() {
  return (
    <section className={`${style.contact} -inverted`} id="contact">
      <div className={`${style['contact-wrapper']} wrapper`}>
        <div className={style['contact-message-wrapper']}>
          <p className={style['contact-message']}>Get in touch with us at</p>
          <Sparkles>
            <a className={style['contact-email']} href={`mailto:${email}`}>
              {email}
            </a>
          </Sparkles>
          <p className={style['contact-message']}>
            ... or through our social media
          </p>
        </div>
        <Social size="l" filter={({ label }) => label !== 'email'} />
      </div>
    </section>
  );
}

export default Contact;
