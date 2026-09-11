import type { Metadata } from 'next';

import Header from 'components/header';
import Footer from 'components/footer';
import { createMetadata } from 'lib/metadata';

import './styles.css';

export const dynamic = 'force-static';

export const metadata: Metadata = createMetadata({
  title: 'Amano Newsletter',
  path: '/newsletter/confirmation-sent',
});

export default function NewsletterConfirmation() {
  return (
    <>
      <Header />
      <main className="p-newsletter-subscribed -inverted">
        <div className="p-newsletter-subscribed-wrapper wrapper">
          <div className="p-newsletter-subscribed-info">
            <h1>Almost there...</h1>
            <p>
              We’ve sent you an email. Open it and tap{' '}
              <strong>confirm subscription</strong> to complete sign-up.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
