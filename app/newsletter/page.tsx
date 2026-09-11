import type { Metadata } from 'next';

import Header from 'components/header';
import Footer from 'components/footer';
import { createMetadata } from 'lib/metadata';

import './styles.css';

export const dynamic = 'force-static';

export const metadata: Metadata = createMetadata({
  title: 'Amano Newsletter',
  path: '/newsletter',
});

export default function Newsletter() {
  return (
    <>
      <Header />
      <main className="p-newsletter -inverted" id="newsletter">
        <div className="p-newsletter-wrapper wrapper">
          <div className="p-newsletter-info">
            <h1>Newsletter</h1>
            <p>
              We send one email whenever we do something important, which tends
              to happend at most twice a year. And you can always unsubscribe.
            </p>
          </div>
          <form
            className="p-newsletter-form"
            method="post"
            action="https://news.amano.games/subscription/form"
          >
            <header>
              <h2>Subscribe</h2>
            </header>
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
            <label htmlFor="name">
              <span>Email</span>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
                required
              />
            </label>
            <label htmlFor="name">
              <span>Name (optional):</span>
              <input id="name" name="name" type="text" placeholder="Mario C." />
            </label>
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

            <button value="Subscribe " type="submit">
              Subscribe
            </button>
          </form>
          <div className="p-newsletter-info p-newsletter-info-secondary">
            <p>
              You can view past issues{' '}
              <a
                href="https://news.amano.games/archive"
                rel="noopener noreferrer"
                target="_blank"
              >
                here
              </a>
              .
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
