const baseConfig = require('./webpack.base');
const { merge } = require('webpack-merge');

const prodConfig = {
  mode: 'production',
  // 配置devServer
  devServer: {
    // 指定服务器根目录
    contentBase: './dist',
    // 自动打开浏览器
    open: true,
  },
}

module.exports = merge(baseConfig, prodConfig);