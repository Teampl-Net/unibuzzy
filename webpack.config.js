var HtmlwebpackPlugin = require('html-webpack-plugin')
var UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin')
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin')

module.exports = {
  devServer: {
    // 프록시 설정
    proxy: {
      // 프록시 요청을 보낼 api의 시작 부분
      '^/': {
        target: 'http://192.168.0.22:19090',
        changeOrigin: true,
        secure: false,
        pathRewrite: { '^/': '/' },
        logLevel: 'debug'
      },
      '^/firebase': {
        target: 'https://firebasedynamiclinks.googleapis.com',
        changeOrigin: true,
        secure: false,
        pathRewrite: { '^/firebase': '/' },
        logLevel: 'debug'
      }
    }
  },
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
      { test: /\.hbs$/, loader: 'handlebars-loader' }
    ]
  },
  plugins: [
    new HtmlwebpackPlugin({
      title: 'Intro to webpack',
      template: 'src/index.html'
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
