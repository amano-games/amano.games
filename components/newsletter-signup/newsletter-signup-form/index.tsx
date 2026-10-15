import classNames from 'classnames';
import NewsletterCaptcha from 'components/newsletter-captcha';
import './styles.css';

type Props = {
  className?: string;
};

function NewsletterSignupForm({ className }: Props) {
  const customClassName = classNames('c-newsletter-signup-form', className);
  return (
    <form
      className={customClassName}
      method="post"
      action="https://news.amano.games/subscription/form"
    >
      <div className="c-newsletter-signup-form-fields-wrapper">
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
          defaultChecked
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
      <NewsletterCaptcha />
    </form>
  );
}

export default NewsletterSignupForm;
