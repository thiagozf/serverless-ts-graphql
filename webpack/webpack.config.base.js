const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const HappyPack = require('happypack')
const path = require('path')
const slsw = require('serverless-webpack')
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin')
const _ = require('lodash')

const rootDir = path.join(__dirname, '../')

const defaults = {
  entry: slsw.lib.entries,
  target: 'node',
  mode: 'production',
  devtool: 'none',
  resolve: {
    extensions: ['.mjs', '.js', '.jsx', '.json', '.ts', '.tsx'],
    alias: {
      // Remove unecessary dependencies, reducing bundle sizew!
      'google-libphonenumber': path.resolve(
        __dirname,
        '../src/stubs/libphonenumber.js',
      ),
    },
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(rootDir, '.webpack'),
    filename: '[name].js',
  },
  plugins: [
    new FilterWarningsPlugin({
      // Ignore dynamic dependency requires
      exclude: /Critical dependency: the request of a dependency is an expression/,
    }),
    new HardSourceWebpackPlugin(),
    new HappyPack({
      id: 'ts',
      threads: require('os').cpus().length - 1,
      loaders: [
        {
          path: 'babel-loader',
        },
      ],
    }),
  ],
  module: {
    rules: [{ test: /\.tsx?$/, loader: 'happypack/loader?id=ts' }],
  },
}

module.exports.defaults = defaults

module.exports.merge = function merge(config) {
  return _.merge({}, defaults, config)
}
