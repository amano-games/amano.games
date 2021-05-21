import Head from 'next/head';

const description = `Two frinds making games by hand.`;
const title = `AMANO`;
const url = `https://amano.games`;
const image = `https://amano.games/preview.png`;
const twitter = `@gamesamano`;
const color = `#ffbc2f`;

function Seo() {
  return (
    <Head>
      <title>AMANO</title>
      <meta name="description" content={description} />

      <link rel="icon" href="/favicon.ico" />
      <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      <link rel="alternate icon" href="/favicon.ico" />

      <meta name="theme-color" content={color} />

      <meta property="og:title" content={title} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content={twitter} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:creator" content={twitter} />
    </Head>
  );
}

export default Seo;
