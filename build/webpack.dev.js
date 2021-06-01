const baseConfig = require('./webpack.base');
const { merge } = require('webpack-merge');

// 导入webpack
const webpack = require('webpack');

const devConfig = {
  mode: 'development',
  // 配置devServer
  devServer: {
    // 指定服务器根目录
    contentBase: './dist',
    // 自动打开浏览器
    open: true,
    hot: true
  },
  // 插件配置
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}

module.exports = merge(baseConfig, devConfig);