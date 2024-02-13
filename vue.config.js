module.exports = {
  chainWebpack: (config) => {
    config.plugins.delete('prefetch')
    config.module
      .rule('i18n')
      .resourceQuery(/blockType=i18n/)
      .type('javascript/auto')
      .use('i18n')
      .loader('@intlify/vue-i18n-loader')
      .end()
  },
  devServer: {
    // 프록시 설정
    proxy: {
      // 프록시 요청을 보낼 api의 시작 부분
      '^/sUniB': {
        // target: 'https://mo.d-alim.com:9443/service', // 개발
        target: 'https://www.unibuzzy.com/sUniB', // 패치
        // target: 'http://192.168.0.78:9443',
        // target: 'http://192.168.0.10:9443',
        // target: 'http://localhost:9443',
        // target: 'http://192.168.219.103:19090',
        // https://mo.d-alim.com:10443
        changeOrigin: true,
        secure: false,
        pathRewrite: { '^/sUniB': '/' },
        logLevel: 'debug'
      },
      '^/fileServer': {
        // http://m.passtory.net:7443/
        // target: 'http://192.168.0.100:9091',
        // target: 'http://192.168.0.100:9091',
        target: 'http://192.168.0.78:9443',
        changeOrigin: true,
        secure: false,
        pathRewrite: { '^/fileServer': '/' },
        /* pathRewrite: { '^/fileServer': '/fileServer' }, */
        logLevel: 'debug'
      },
      '^/boardMain/service': {
        target: 'https://mo.d-alim.com',
        // target: 'http://192.168.0.10:9090',
        // target: 'http://192.168.0.10:19090',
        // target: 'http://localhost:19090',
        // target: 'http://192.168.219.103:19090',
        // https://mo.d-alim.com:10443
        changeOrigin: true,
        secure: false,
        pathRewrite: { '^/boardMain/service': '/service' },
        logLevel: 'debug'
      },
      '^/login/service': {
        // target: 'https://mo.d-alim.com',
        target: 'http://192.168.0.10:8083',
        // target: 'http://192.168.0.10:9090',
        // target: 'http://192.168.0.10:19090',
        // target: 'http://localhost:19090',
        // target: 'http://192.168.219.103:19090',
        // https://mo.d-alim.com:10443
        changeOrigin: true,
        secure: false,
        pathRewrite: { '^/login/service': '/' },
        logLevel: 'debug'
      },
      '^/eduPl': {
        target: 'https://mo.d-alim.com',
        // target: 'http://192.168.0.10:9090',
        // target: 'http://192.168.0.10:19090',
        // target: 'http://222.233.118.96:19090',
        // target: 'http://192.168.219.103:19090',
        // https://mo.d-alim.com:10443
        changeOrigin: true,
        secure: false,
        pathRewrite: { '^/eduPl': '/eduPl' },
        logLevel: 'debug'
      },
      '^/apt123': {
        target: 'https://mo.d-alim.com',
        // target: 'http://192.168.0.10:9090',
        // target: 'http://localhost:8083',
        // target: 'http://192.168.0.10:19090',
        // target: 'http://192.168.219.103:19090',
        // https://mo.d-alim.com:10443
        changeOrigin: true,
        secure: false,
        pathRewrite: { '^/apt123': '/apt123' },
        logLevel: 'debug'
      },
      '^/fb.': {
        target: 'https://oauth2.googleapis.com',
        changeOrigin: true,
        secure: false,
        pathRewrite: { '^/fb.': '/' },
        logLevel: 'debug'
      },
      '^/iamport': {
        target: 'https://api.iamport.kr',
        changeOrigin: true,
        secure: false,
        pathRewrite: { '^/iamport': '/' },
        logLevel: 'debug'
      }
    }
  },
  css: { extract: false }
}
