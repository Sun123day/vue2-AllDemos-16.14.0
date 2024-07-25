const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // dev: {
  //   autoOpenBrowser: true,
  // },
  // 关闭eslint校验
  lintOnSave: false
})
