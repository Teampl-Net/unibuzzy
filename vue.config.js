
module.exports = {
  devServer: {
    // 프록시 설정
    proxy: {
      // 프록시 요청을 보낼 api의 시작 부분
      '^/service': {
        target: 'http://localhost:19090',
        // target: 'http://192.168.219.103:19090',
        // https://mo.d-alim.com:10443
        changeOrigin: true,
        secure: false,
        pathRewrite: { '^/service': '/' },
        logLevel: 'debug'
      },
      '^/fileServer': {
        // http://m.passtory.net:7443/
        // target: 'http://222.233.118.96:19091',
        target: '/fileServer',
        changeOrigin: true,
        secure: false,
        pathRewrite: { '^/fileServer': '/' },
        /* pathRewrite: { '^/fileServer': '/fileServer' }, */
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
