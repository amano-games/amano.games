import classNames from 'classnames';
import Link from 'next/link';

import NewsletterSignupForm from './newsletter-signup-form';

import './styles.css';

type Props = {
  className?: string;
};

function NewsletterSignup({ className }: Props) {
  const customClassName = classNames('c-newsletter-signup', className);
  return (
    <div className={customClassName}>
      <NewsletterSignupForm />
      <div className="c-newsletter-signup-info">
        <p>
          Subscribe to our <Link href="/newsletter">newsletter</Link>.{' '}
          We&apos;ll send one email whenever we do something important, which
          tends to happen at most twice a year. And you can always unsubscribe.
        </p>
      </div>
    </div>
  );
}

export default NewsletterSignup;
