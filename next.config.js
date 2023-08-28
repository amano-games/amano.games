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
  webpack(config) {
    // https://github.com/vercel/next.js/issues/25950#issuecomment-863298702
    const fileLoaderRule = config.module.rules.find(
      (rule) => rule.test && rule.test.test('.svg')
    );
    fileLoaderRule.exclude = /\.svg$/;
    config.module.rules.push({
      test: /\.svg$/,
      loader: require.resolve('@svgr/webpack'),
    });
    return config;
  },
};
