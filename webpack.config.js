const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  // 构建环境 开发环境
  mode: 'development',
  // 入口
  entry: {
    app: './src/index.js'
  },
  // 错误追踪
  devtool: 'inline-source-map',
  // 开发环境本地启动的服务配置
  devServer: {
    static: './dist', // 路径
    open: true, //启动后自动打开浏览器
    hot: true, //启用 webpack 的 热模块替换 特性：
    port: 8082, // 端口
  },
  // 出口
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js',
    clean: true
  },
  // 模块
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,//一个匹配loaders所处理的文件的拓展名的正则表达式，这里用来匹配js和jsx文件（必须）
        exclude: /node_modules/,//屏蔽不需要处理的文件（文件夹）（可选）
        loader: 'babel-loader',//loader的名称（必须）
      },
      {
        test: /\.css$/,
        use: [
          'style-loader', // 创建 <style></style>
          'css-loader',  // 转换css
        ]
      },
      {
        test: /\.less$/i,
        use: [
          'style-loader',
          'css-loader',
          'less-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000, // url-loader 包含file-loader，这里不用file-loader, 小于10000B的图片base64的方式引入，大于10000B的图片以路径的方式导入
          name: 'static/img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000, // 小于10000B的图片base64的方式引入，大于10000B的图片以路径的方式导入
          name: 'static/fonts/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  // 插件
  plugins: [
    new HtmlWebpackPlugin({
      title: 'title',
      template: path.resolve(__dirname, './public/index.html'), // html模板的生成路径
      filename: 'index.html',//html模板
      inject: true, // true：默认值，script标签位于html文件的 body 底部
      hash: true, // 在打包的资源插入html会加上hash
      //  html 文件进行压缩
      minify: {
        removeComments: true,               //去注释
        collapseWhitespace: true,           //压缩空格
        removeAttributeQuotes: true         //去除属性 标签的 引号  例如 <p id="test" /> 输出 <p id=test/>
      }
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, './static'),  // 从哪个目录copy
          to: 'static' // copy到那个目录
        }
      ],
    }),
  ],
}