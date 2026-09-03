import PropTypes from 'prop-types';
import classNames from 'classnames';

import style from './style.module.css';

function NewsletterSignupForm({ className }) {
  const customClassName = classNames(
    style['newsletter-signup-form'],
    className
  );
  return (
    <form
      className={customClassName}
      method="post"
      action="https://news.amano.games/subscription/form"
    >
      <div className={style['fields-wrapper']}>
        <input type="hidden" name="nonce" />
        <input
          type="hidden"
          name="next"
          value="https://amano.games/newsletter/confirmation-sent"
        />
        <input
          id="3d2ed"
          type="checkbox"
          name="l"
          checked
          value="3d2ed56a-309b-4c36-9c88-1c903b0f7d92"
          hidden
        />

        <input
          id="email"
          name="email"
          type="email"
          placeholder="your@email.com"
          required
        />
        <button type="submit" value="Subscribe ">
          Subscribe
        </button>
      </div>
      <altcha-widget
        hideLogo
        hideFooter
        challengeurl="https://news.amano.games/api/public/captcha/altcha"
      />
      <script
        type="module"
        src="https://news.amano.games/public/static/altcha.umd.js"
        async
        defer
      />
    </form>
  );
}

NewsletterSignupForm.propTypes = {
  className: PropTypes.string,
};

export default NewsletterSignupForm;
