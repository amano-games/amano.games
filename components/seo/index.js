import Head from 'next/head';
import PropTypes from 'prop-types';

import {
  url,
  twitter,
  color,
  defaultDescription,
  defaultTitle,
  defaultImage,
} from 'lib/site';

const RSS_TITLE = "RSS feed for Amano's devlog";
function Seo({ title, description, image }) {
  const imagePath = `${url}/${image}`;
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />

      <link rel="icon" href="/favicon.ico" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="alternate icon" href="/favicon.ico" />

      <meta name="theme-color" content={color} />

      <meta property="og:title" content={title} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imagePath} />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content={twitter} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:creator" content={twitter} />

      <link
        rel="alternate"
        type="application/rss+xml"
        title={RSS_TITLE}
        href="/rss/feed.xml"
      />
      <link
        rel="alternate"
        type="application/atom+xml"
        title={RSS_TITLE}
        href="/rss/feed.xml"
      />
    </Head>
  );
}

Seo.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
};

Seo.defaultProps = {
  title: defaultTitle,
  description: defaultDescription,
  image: defaultImage,
};

export default Seo;
