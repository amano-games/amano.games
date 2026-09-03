import Header from 'components/header';
import Footer from 'components/footer';
import Seo from 'components/seo';

import styles from './style.module.css';

function Newsletter() {
  return (
    <>
      <Seo title="Amano Newsletter" />
      <Header />
      <main
        className={`${styles['p-newsletter-subscribed']} -inverted`}
        id="newsletter"
      >
        <div className={`${styles['p-newsletter-subscribed-wrapper']} wrapper`}>
          <div className={styles['p-newsletter-subscribed-info']}>
            <h1>Newsletter</h1>
            <p>Subscribed successfully!</p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

Newsletter.propTypes = {};

export default Newsletter;
