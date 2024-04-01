const path = require('path');

module.exports = {
  i18n: {
    defaultLocale: 'vi',
    locales: ['vi', 'th', 'en'],
    localeDetection: false,
  },
  debug: true,
  localePath: path.resolve('./public/static/locales'),
};
