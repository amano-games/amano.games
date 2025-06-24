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
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.('.svg')
    );

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ['@svgr/webpack'],
      }
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};
