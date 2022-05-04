const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  //关闭eslint
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api': {// 匹配所有以 '/api'开头的请求路径
        target: 'http://39.98.123.211',// 代理目标的基础路径
        changeOrigin: true,
        //pathRewrite: {'^/api': ''}
      },
    }
  },
  //不要打包的map文件（map文件作用，显示代码错误的具体位置）
  productionSourceMap:false
})
