const path = require('path')
const slsw = require('serverless-webpack')
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin')
// require('source-map-support').install()

let entries = {}

if (slsw.lib.webpack.isLocal) {
  Object.keys(slsw.lib.entries).forEach(
    key => (entries[key] = ['./source-map-install.js', slsw.lib.entries[key]]),
  )
} else {
  entries = slsw.lib.entries
}

module.exports = {
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  entry: entries,
  devtool: 'source-map',
  resolve: {
    extensions: ['.mjs', '.js', '.jsx', '.json', '.ts', '.tsx'],
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js',
  },
  // TODO: Fix warning
  plugins: [
    new FilterWarningsPlugin({
      exclude: /Critical dependency: the request of a dependency is an expression/,
    }),
  ],
  target: 'node',
  module: {
    rules: [{ test: /\.tsx?$/, loader: 'babel-loader' }],
  },
}
