/* eslint filenames/match-regex: 0 */

module.exports = {
  target: 'serverless',
  images: { disableStaticImages: true },
  webpack5: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};
