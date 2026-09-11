/* eslint filenames/match-regex: 0 */

export default {
  plugins: {
    'postcss-flexbugs-fixes': {},
    'postcss-preset-env': {
      stage: 3,
      autoprefixer: false,
      features: {
        'custom-properties': false,
      },
    },
    autoprefixer: {
      flexbox: 'no-2009',
    },
  },
};
