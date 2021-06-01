
## 运行

```shell
npm install

npm run dev
```


## 小结

这是一个简单的小项目，主要练习一些几方面的知识

- webpack的简单配置
- vue的组件通信
- vue的v-bind指令、v-on指令、v-model指令
- vue的watch监听器
- 简单的css布局
- 一个简单vue项目的搭建流程



## 项目搭建

```shell
# 项目初始化
npm init -y 
# 安装 webpack webpack-cli 依赖 开发环境
npm install webpack webpack-cli -D

# 安装 vue
npm install vue
```

- 入口文件 index.html

- 业务代码文件夹 src

- 项目的总入口文件 src/main.js

- App组件 App.vue


**main.js**
```js
// 导入Vue
import Vue from 'vue';
// 导入App组件
import App from './App.vue';
// 创建Vue根实例
new Vue({
  el: '#app',
  components:{
    App
  },
  // 挂载App组件 
  template: '<App />'
});

```

直接引用main.js, 测试

> Uncaught SyntaxError: import declarations may only appear at top level of a module

这是因为浏览器不认识import，为了让浏览器能够正常的解析，因此需要使用webpak将源代码进行打包


webpack的配置

webpack.config.js
```js
// 导入path模块
const path = require('path');
module.exports = {
  // 入口：从哪个文件开始打包
  entry: './src/main.js',
  // 出口：打包完成的文件放在那里
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
}
```

这些npm run build 进行测试

> Module parse failed: Unexpected token (1:0)
>
>You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
```
> <template>
|   <div></div>
| </template>
```
> @ ./src/main.js 4:0-28 9:4-7

报错原因是：webpack本身只能打包js文件，对于后缀名为vue的文件不能直接打包，需要安装**vue-loader**进行转换


```shell
# 安装 vue-loader 
npm install vue-loader vue-template-compiler -D

# 因为vue-loader需要依赖css-loader
npm install css-loader -D
```

修改webpack的配置--配置loader与plugin
```js
// 导入path模块
const path = require('path');
// 导入vue-loader的插件
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  mode: 'development',
  // 入口：从哪个文件开始打包
  entry: './src/main.js',
  // 出口：打包完成的文件放在那里
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  // 打包规则
  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader'
    }]
  },
  // 插件配置
  plugins: [
    new VueLoaderPlugin()
  ]
}
```


在index.html文件中引用打包好的bundle.js

> [Vue warn]: You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build.

Vue打包时会生成三个文件

- runtime only 的文件 vue.common.js (默认导出)
- compiler only 的文件 compiler.js
- runtime + compiler 的文件 vue.js (添加alias, 设置导出为vue.js)


webpack.config.js - 添加alias

```js
resolve: {
    alias: {
      'vue': 'vue/dist/vue.js',
      '@': path.resolve(__dirname, '../src')
    }
  }
```



## 其它常用loader

**file-loader**: 将文件复制到对应的路径，并返回文件名（hash值）

安装
```shell
npm install file-loader -D
```
配置
```js
// 打包规则
module: {
  rules: [
  {
    test: /\.(jpg|jpeg|png|svg)$/,
    loader: 'file-loader',
    options: {
      name: '[name].[ext]' // 配置复制后图片的名字命名
    }
  }]
},
```



**url-loader**: 功能类似 file-loader, 当文件大小低于指定的限制时，返回一个DataURL

区别是直接将小图片以base64打包在js中，减少http请求的次数，提高访问效率

安装
```shell
npm install url-loader -D
```
配置
```js
// 打包规则
module: {
  rules: [
  {
    test: /\.(jpg|jpeg|png|svg)$/,
    loader: 'file-loader',
    options: {
      name: '[name].[ext]' // 配置复制后图片的名字命名
      limit: 2048 // 2048byte
    }
  }]
}
```



**css-loader** : 打包css文件

```shell
npm install css-loader style-loader -D
```
配置
```js
// 打包规则
module: {
  rules: [
  {
    test: /\.css$/,
    use: ['style-loader', 'css-loader'] 
    // loader执行顺序：从右到左，从下到上的顺序依次执行
  }]
}
```

- css-loader: 解决文件之间的依赖关系，把所有的css文件打包成一个文件
- style-loader：把css-loader打包完成后生成的文件挂载到页面的head标签的style中



**syulus-loader**:打包stylus文件

vscode插件：
language-stylus: 提供语法高亮效果和一些支持
Manta's Stylus Superemacy: 自动格式化stylus

settings.json
```json
"stylusSupremacy.insertBraces": false,
"stylusSupremacy.insertSemicolons": false
```

安装：
```shell
npm install stylus stylus-loader -D
```
配置
```js
// 打包规则
module: {
  rules: [
  {
    test: /\.styl(us)?$/,
    use: ['style-loader', 'css-loader', 'stylus-loader']
  }]
}
```

处理vue里面的stylus
配置
```js
// 打包规则
module: {
  rules: [
  {
    test: /\.styl(us)?$/,
    use: ['vue-style-loader', 'css-loader', 'stylus-loader']
  }]
}
```



webpcak的四个概念

- 入口（entry）
- 出口（output）
- loader
- plugin



**html-webpack-plugin**: 自动生成HTML5文件，自动引入打包好的js包

安装
```shell
npm install html-webpack-plugin -D
```
配置
```js
// 导入html-webpack-plugin
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 插件配置
plugins: [
  new HtmlWebpackPlugin({
    template: './index.html'
  })
]
```



**clean-webpack-plugin**

安装
```shell
npm install clean-webpack-plugin -D
```
配置
```js
// 导入clean-webpack-plugin
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// 插件配置
  plugins: [
    new CleanWebpackPlugin(),
  ],
```



**autoprefixer**: 自动添加厂商前置，css兼容

安装
```shell
npm install postcss-loader autoprefixer -D
```
配置
```js
// 打包规则
module: {
  rules: [
  {
    test: /\.css$/,
    use: ['style-loader', 'css-loader', 'postcss-loader']
  }
  ]
},
```
postcss.config.js
```js
module.exports = {
  plugins: [
    require('autoprefixer')
  ]
}
```



## 开发环境 devServer

webpack-dev-server : 实时重新加载

安装
```shell
npm install webpack-dev-server -D
```
配置 webpack.config.js
```js
// 配置devServer
devServer: {
  // 指定服务器根目录
  contentBase: './dist',
  // 自动打开浏览器
  open: true
  // host: 服务器主机
  // port: 端口
  // hot: 热模块替换
  // proxy: 代理
},
```
package.json
```json
"scripts": {
  "start": "webpack-dev-server"
},
```

## 热模块替换（HMR）

配置
在devServer 中启用热模块替换

```js
devServer: {
  // 指定服务器根目录
  contentBase: './dist',
  // 自动打开浏览器
  open: true,
  hot: true
},
```

```js
// 导入webpack
const webpack = require('webpack');
...
// 插件配置
plugins: [
  new webpack.HotModuleReplacementPlugin()
],
```

## SourceMap

源代码映射，建立打包后的文件和源代码所在行的映射

作用：在开发时快速定位到出错的源代码行

配置 - webpack.config.js
```js
devtool: 'eval',
```

## 生产环境

- webpack.dev.js 开发环境
- webpack.prod.js 生产环境

```json
"scripts": {
  "dev": "webpack server --config ./webpack.dev.js",
  "build": "webpack --config ./webpack.prod.js"
},
```


提取公共部分

webpack-merge工具

安装

```shell
npm install webpack-merge -D
```


## 解析ES6语法

Babel是一个 JavaScript编译器

安装
```shell
npm install --save-dev babel-loader @babel/core
```

配置 - webpack.base.js
```js
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
```

安装
```shell
npm install @babel/preset-env --save-dev
```
配置 - .babelrc
```
{
  "presets": [
    "@babel/preset-env"
  ]
}
```

## 组件拆分

一个页面有多个组件组成，组件在包含子组件。

TodoList组件拆分

- MainHeader.vue
- MainTodo.vue
  - TodoItem.vue
  - TodoInfo.vue
- MainFooter.vue

## 目录结构

```
|-- src
  |-- App.vue
  |-- main.js
  |-- assets
    |-- images
    |  |-- bg.jpg
    |-- styles
  |-- components
    |-- MainHeader.vue
    |-- MainTodo
    |  |-- MainTodo.vue
    |  |-- coms
    |  |  |-- TodoItem.vue
    |  |  |-- TodoInfo.vue
    |-- MainFooter.vue
```

## 资源 URL 转换会遵循如下规则：

> 如果路径是绝对路径 (例如 /images/foo.png)，会原样保留。
>
>如果路径以 . 开头，将会被看作相对的模块依赖，并按照你的本地文件系统上的目录结构进行解析。
>
>如果路径以 ~ 开头，其后的部分将会被看作模块依赖。这意味着你可以用该特性来引用一个 Node 依赖中的资源：
>
><img src="~some-npm-package/foo.png">
>
>如果路径以 @ 开头，也会被看作模块依赖。如果你的 webpack 配置中给 @ 配置了 alias，这就很有用了。所有 vue-cli 创建的项目都默认配置了将 @ 指向 /src

## 组件业务

- 添加功能
- 选中功能
- 删除功能

1. 添加功能
- 输入内容，回车之后，添加记录
- 没有输入，则不添加
- 添加后，输入框内容清空

父传子 props

2. 选中功能
- 点击按钮，按钮样式改变，文本显示删除线
- 再次点击，样式改变，文本正常显示

v-bind 样式的绑定

3. 删除功能
- 点击删除按钮，记录被删除

子传父 自定义事件

4. 统计功能

watch 进行监听，然后传递给子组件

5. 状态切换

all actived completed

计算属性computed

6. 删除所有已完成的记录



## MainFooter

Written By Jielin
