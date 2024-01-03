var HtmlwebpackPlugin = require('html-webpack-plugin')
var UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin')
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin')
const webpack = require('webpack')
module.exports = {
  entry: {
    vendor: ['babel-polyfill', 'lodash'],
    main: './src/main.js'
  },
  output: {
    path: './dist',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: { plugins: ['transform-runtime'], presets: ['es2015'] }
      },
      { test: /\.hbs$/, loader: 'handlebars-loader' },
      {
        resourceQuery: /blockType=i18n/,
        type: 'javascript/auto',
        loader: '@intlify/vue-i18n-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js'],
    fallback: {
      stream: require.resolve('stream-browserify'),
      buffer: require.resolve('buffer')
    }
  },

  plugins: [
    new HtmlwebpackPlugin({
      title: '모두조인!',
      template: 'src/index.html'
    }),
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer']

    }),
    new webpack.ProvidePlugin({
      process: 'process/browser'
    }),

    new UglifyJsPlugin({
      beautify: false,
      mangle: { screw_ie8: true },
      compress: { screw_ie8: true, warnings: false },
      comments: false
    }),
    new CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.bundle.js'
    })
  ]
}
