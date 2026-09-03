import Header from 'components/header';
import Footer from 'components/footer';
import Seo from 'components/seo';

import styles from './style.module.css';

function NewsletterConfirmation() {
  return (
    <>
      <Seo title="Amano Newsletter" />
      <Header />
      <main className={`${styles['p-newsletter-subscribed']} -inverted`}>
        <div className={`${styles['p-newsletter-subscribed-wrapper']} wrapper`}>
          <div className={styles['p-newsletter-subscribed-info']}>
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

NewsletterConfirmation.propTypes = {};

export default NewsletterConfirmation;
