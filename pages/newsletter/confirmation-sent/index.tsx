import Header from 'components/header';
import Footer from 'components/footer';
import Seo from 'components/seo';

function NewsletterConfirmation() {
  return (
    <>
      <Seo title="Amano Newsletter" />
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

export default NewsletterConfirmation;
