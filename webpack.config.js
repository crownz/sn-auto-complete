switch (process.env.NODE_ENV) {
  case 'dev':
    module.exports = require('./webpack/webpack.config.dev');
    break;
  case 'prod':
    module.exports = require('./webpack/webpack.config.prod');
    break;
  default:
    break;
}