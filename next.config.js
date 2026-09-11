/* eslint filenames/match-regex: 0 */

const CONTENT_TYPE_WEBFINGER = 'application/jrd+json';

export default {
  async headers() {
    return [
      {
        source: '/.well-known/webfinger',
        headers: [
          {
            key: 'Content-Type',
            value: CONTENT_TYPE_WEBFINGER,
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/don-salmon',
        destination: '/game/don-salmon',
        permanent: true,
      },
      {
        source: '/don-salmon/wishlist',
        destination: '/game/don-salmon/wishlist',
        permanent: true,
      },
    ];
  },
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
};
