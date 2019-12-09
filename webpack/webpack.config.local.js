const slsw = require('serverless-webpack')
const base = require('./webpack.config.base');

const isLocal = slsw.lib.webpack.isLocal;
const entry = {};

if (isLocal) {
  Object.keys(slsw.lib.entries).forEach(
    key => (entry[key] = ['./source-map-install.js', slsw.lib.entries[key]]),
  )
} else {
  entry = slsw.lib.entries
}

module.exports = base.merge({
  entry,
  mode: 'development',
  devtool: 'source-map',
});
