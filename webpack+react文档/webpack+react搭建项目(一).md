### react+webpack5搭建项目

##### 项目初始化

- 新建文件夹，进入项目根目录 创建默认的package.json

```bash
yarn init -y
```

- 安装webpack(模块打包库)和`webpack-cli`（命令行工具）

```bash
yarn add webpack webpack-cli -D
```

- 根目录新建`src`,src中新建`index.js`
- 项目结构

![image-20220208095121246](C:\Users\77696\AppData\Roaming\Typora\typora-user-images\image-20220208095121246.png)

##### 基础配置

- 在根目录下新建一个`webpack.config.js`    

  > 此文件为自定义webpack配置文件，在此配置中
  >
  > - 通过  require(...)  引入其他文件
  > - 通过 require(...) 使用npm下载的工具函数
  > - 使用 JavaScript 控制流表达式，例如 ?: 操作符
  > - 对 value 使用常量或变量赋值
  > - 编写并执行函数，生成部分配置

- 在 `webpack.config.js` 中加入以下代码

```js
const path = require('path');

module.exports = {
  entry: {
    app: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js'
  }
}
```

 	其中 `entry `为入口  打包从此文件开始 `output` 为打包后输出的位置 可以有多个`entry`，只能有一个`output `，`[name]`是一个占位符，这里是根据我们在`entry`中定义的key值，即等价于app

- 可以使用此命令构建

  ```bash
  npx webpack --config webpack.config.js
  ```

  webpack官网说明：如果 `webpack.config.js` 存在，则 `webpack` 命令将默认选择使用它。我们在这里使用 `--config` 选项只是向你表明，可以传递任何名称的配置文件。这对于需要拆分成多个文件的复杂配置是非常有用的。

   所以当`webpack.config.js`存在时，以此文件构建可以执行

  ```bash
  npx webpack
  ```

  进行构建，当想要使用其他自定义配置进行构建时可以使用

  ```bash
  npx webpack --config webpack.config.js
  ```

  其中 `webpack.config.js`为 自定义配置文件名称

- 为了简化`npx webpack --config webpack.config.js` 此命令在 package.json中加入以下代码

  ```js
  "scripts": {
   	"build": "webpack"
    }
  ```

  之后可以使用 

  ```bash
  yarn run build
  ```

   代替`npx webpack --config webpack.config.js`

- 运行命令成功后可以看到打包的结构，其在根目录下生成了一个dist目录

<img src="C:\Users\77696\AppData\Roaming\Typora\typora-user-images\image-20220208104218423.png" alt="image-20220208104218423"  />

##### 设置Plugins

​	以 HtmlWebpackPlugin 为例

- 安装

  ```bash
  yarn add html-webpack-plugin -D
  ```

- 在根目录下新建一个文件 `public/index.html`内容如下

  ```ejs
  <!DOCTYPE html>
  <html lang="en">
   <head>
    <title><%= htmlWebpackPlugin.options.title %></title>
   </head>
   
   <body>
    <div id="root"></div>
   </body>
  </html>
  
  ```

  其中title是读取html-webpack-plugin插件的配置

- 在 `webpack.config.js`中加入以下代码

  ```js
  // 引入HtmlWebpackPlugin
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  
  module.exports = {
   /* ... */
   
   plugins: [
    new HtmlWebpackPlugin({
     title: '我是title',
     template: path.resolve(__dirname, './public/index.html'),
     filename: 'index.html',
    }),
   ],
  }
  ```

  再次运行 `yarn run build` 打包文件 ，打包后输出文件 `dist`中多了一个`index.html`,其中自动插入了标题和script

- 设置 打包前清除 `dist`  

  在`webpack.config.js`的`output`中加入一行代码

  ```js
  output: {
       filename: '[name].bundle.js',
       path: path.resolve(__dirname, 'dist'),
       clean: true, //加入此行
     },
  ```

##### 设置loaders

> ​	webpack 只能理解 JavaScript 和 JSON 文件,loader 让 webpack 能够去处理其他类型的文件,例如样式文件 .css .sass .less 图片等。

  以  less-loader 为例

- 安装

  ```bash
  yarn add style-loader css-loader less less-loader  -D
  ```

- 在`webpack.config.js` 中配置 less-loader

  ```js
  module.exports = {
      /* ... */
    module: {
      rules: [
        {
          test: /\.less$/i,
          use: [
            // compiles Less to CSS
            'style-loader',
            'css-loader',
            'less-loader',
          ],
        },
      ],
    },
  };
  ```

- 使用 `yarn run build` 运行 webpack

##### 使用source maps 追踪代码报错

> 当 webpack 打包源代码时，可能会很难追踪到 error(错误) 和 warning(警告) 在源代码中的原始位置。例如，如果将三个源文件（`a.js`, `b.js` 和 `c.js`）打包到一个 bundle（`bundle.js`）中，而其中一个源文件包含一个错误，那么堆栈跟踪就会直接指向到 `bundle.js`。你可能需要准确地知道错误来自于哪个源文件，所以这种提示这通常不会提供太多帮助。
>
> 为了更容易地追踪 error 和 warning，JavaScript 提供了 [source maps](http://blog.teamtreehouse.com/introduction-source-maps) 功能，可以将编译后的代码映射回原始源代码。如果一个错误来自于 `b.js`，source map 就会明确的告诉你

```js
// webpack.config.js
 
module.exports = {
 devtool: 'inline-source-map'
 // ...
}

```

##### 设置热编译

>- 当我们改动代码时，希望能自动重新编译代码，webpack提供了三种不同的方式：
>
>  - 监听模式
>
>  - wenpack-dev-server
>  - webpack-dev-middleware
>
>- 大多数情况，使用的是webpack-dev-server

- 安装

```bash
yarn add webpack-dev-server -D
```

- 在`webpack.config.js`中配置

```js
// webpack.config.js
module.exports = {
 // ...
devServer: {
    static: './dist', // 路径
    open: true, //启动后自动打开浏览器
    hot: true, //启用 webpack 的 热模块替换 特性：
    port: 8082, // 端口
  },
}

```

- 在package中设置快捷启动

```js
 "scripts": {
    "start": "webpack serve"
  }
```

- 启动项目,执行命令

```bash
yarn start
```

>  浏览器会自动打开http://localhost:8082





##### 引入react框架

1. ##### 安装react

```bash
yarn react react-dom
```

- 修改src/index.js文件为react 文件

2. ##### 安装babel

> Babel 是一个 JavaScript 编译器，能将 ES6 代码转为 ES5 代码，让你使用最新的语言特性而不用担心兼容性问题，并且可以通过插件机制根据需求灵活的扩展，我们需要先安装以下库

```bash
yarn add babel-loader @babel/core @babel/preset-env @babel/preset-react -D
```

> - `@babel/core babel`babel的核心库
>
> - `@babel/preset-env` 把es6,es7语法转换成es5。bebel7以上的版本只用这一个预设包就可以实现语法的转换，已经废弃了`preset-stage-0，preset-stage-1，preset-stage-2`等这些包。但是这个包还不能转换es6，es7的一些新特性比如`Array.includes()`，这就需要我们使用`@babel/plugin-transform-runtime`了
>
> - `@babel/preset-react` 把react语法转换为es5
> - `@babel/plugin-transform-runtime` 支持一些es6，es7的新语法

- 在`webpack.config.json`中配置babel

```js
// webpack.config.js
module.exports = {
 /* ... */
 
 module: {
  rules: [
   // JavaScript
   {
    test: /\.m?js$/,
    exclude: /node_modules/,
    use: {
     loader: 'babel-loader',
     options: {
      presets: ['@babel/preset-env'],
     },
    },
   },
  ],
 },
}
```

- 在根目录下新建 `.babelrc` 作为babel的配置

```js
{
  "presets": [
    ["@babel/preset-env", {
      "modules": false,
      "targets": {
        "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
      }
    }],
    "@babel/preset-react"
  ]
}
```

- 启动项目 react项目搞定
