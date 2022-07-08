
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
  }
}
