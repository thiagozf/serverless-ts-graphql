const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin
const base = require('./webpack.config.base')

module.exports = base.merge({
  entry: { 'src/graphql': './src/graphql.ts' },
  plugins: [new BundleAnalyzerPlugin()],
})
