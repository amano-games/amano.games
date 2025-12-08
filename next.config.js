/* eslint filenames/match-regex: 0 */

module.exports = {
  async rewrites() {
    return [
      {
        source: '/.well-known/webfinger',
        destination: '/api/.well-known/webfinger',
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
