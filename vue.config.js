
module.exports = {
  devServer: {
    // 프록시 설정
    proxy: {
      // 프록시 요청을 보낼 api의 시작 부분
      '^/tp': {
        target: 'http://192.168.0.10:19090',
        // target: 'http://192.168.219.103:19090',
        // https://mo.d-alim.com:10443
        changeOrigin: true,
        secure: false,
        pathRewrite: { '^/tp': '/tp' },
        logLevel: 'debug'
      },
      '^/fileServer': {
        target: 'http://m.passtory.net:19095',
        changeOrigin: true,
        secure: false,
        pathRewrite: { '^/fileServer': '/' },
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
  css: { extract: false }
}
