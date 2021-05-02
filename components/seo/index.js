import Head from 'next/head';

const description = `Games made by hand`;
const title = `AMANO`;
const url = `https://amano.games`;
const image = `https://amano.games/preview.png`;
const twitter = `@gamesamano`;

function Seo() {
  return (
    <Head>
      <title>AMANO</title>
      <meta name="description" content={description} />

      <link rel="icon" href="/favicon.ico" />

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
