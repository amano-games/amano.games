import Sparkles from 'components/sparkles';
import Social from 'components/social';

import { email } from 'lib/site';

function Contact() {
  return (
    <section className="c-contact -inverted" id="contact">
      <div className="c-contact-wrapper wrapper">
        <div className="c-contact-message-wrapper">
          <p className="c-contact-message">Get in touch with us at</p>
          <Sparkles>
            <a className="c-contact-email" href={`mailto:${email}`}>
              {email}
            </a>
          </Sparkles>
          <p className="c-contact-message">... or through our social media</p>
        </div>
        <Social size="l" filter={({ label }) => label !== 'email'} />
      </div>
    </section>
  );
}

export default Contact;
