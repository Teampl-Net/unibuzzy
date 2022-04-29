
module.exports = {
  chainWebpack: config => {
    config.plugin('html')
      .tap(args => {
        args[0].minify = false
        args[0].interpolate = true
        return args
      })
  }
}
