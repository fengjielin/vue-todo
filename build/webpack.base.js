// 导入path模块
const path = require('path');
// 导入vue-loader的插件
const VueLoaderPlugin = require('vue-loader/lib/plugin')
// 导入html-webpack-plugin
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 导入clean-webpack-plugin
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  // 入口：从哪个文件开始打包
  entry: './src/main.js',
  // 出口：打包完成的文件放在那里
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../dist')
  },
  // 打包规则
  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader'
    },
    {
      test: /\.(jpg|jpeg|png|svg)$/,
      loader: 'url-loader',
      options: {
        name: '[name].[ext]',
        limit: 2048
      }
    },
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader', 'postcss-loader']
    },
    {
      test: /\.styl(us)?$/,
      use: ['style-loader', 'css-loader', 'stylus-loader']
    },
    {
      test: /\.m?js$/,
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }
    ]
  },
  // 插件配置
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    new CleanWebpackPlugin(),
  ],
  resolve: {
    alias: {
      'vue': 'vue/dist/vue.js',
      '@': path.resolve(__dirname, '../src')
    }
  }
}