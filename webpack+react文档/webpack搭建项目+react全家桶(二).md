### webpack搭建项目+react全家桶

[TOC]



#####  使用`react-router-dom`管理路由

```bash
yarn add react-router-dom -D
```

- 仿照`home`文件夹 新建几个组件

- 新建`src/router.js`

  ```js
  import React from "react"
  import { Route, BrowserRouter, Link, Routes } from "react-router-dom"
  import Home from "./home"
  import Blog from "./blog"
  import User from "./user"
  class AppRouter extends React.Component {
    render() {
      return (
        <BrowserRouter>
          <ul>
            <li><Link to="/home">home</Link></li>
            <li><Link to="/blog">blog</Link></li>
            <li><Link to="/user">user</Link></li>
          </ul>
          <div>
            {/* Switch只显示一个组件。加exact表示精确匹配/。如果不加exact，/xxx也会匹配/。  */}
            <Routes >
              {/* exact */}
               < Route path="/" element={<Home />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/user" element={<User />} />
            </Routes>
          </div>
        </BrowserRouter>
      )
    }
  }
  export default AppRouter;
  ```

> `react-router-dom` v6 改变
>
> 使用 <Routes>代替了<Switch> 
>
> `< Route path="/" element={<Home />} />
>
> < Route path="/" component={Home} />
>
> element代替了component 
>
> ！！！注意 element={<Home />} 
>
> Home 为引入的组件，不可写为element={Home}  
>
> v5为 component={Home}  ！！！！！注意区分！！！！！

- 修改`src/index.js`

  ```js
  import React, { useState } from 'react';
  import ReactDOM from 'react-dom'
  import Home from './home/index'
  import User from './blog/index'
  import Blog from './user/index'
  import AppRouter from "./router"
  
  function App() {
    // 声明一个新的叫做 “count” 的 state 变量
    const [count, setCount] = useState(0);
    return (
      <div>
        <AppRouter />
      </div>
    );
  }
  
  const element = <App />
  
  ReactDOM.render(element, document.getElementById('root'));
  ```

- 配置完成启动项目

##### 清除页面默认样式

> 在项目根目录新建static/css/reset.min.css，在index.html模板引入,重新运行，你会发现找不到`/static/css/reset.min.css`。因为这里只是在`index.html`中引入了文件，但是并没有在`webpack`中处理静态文件，我们需要把`static`目录的内容通过`webpack`插架
>  编译构建到包里；此处需要用到`copy-webpack-plugin`

```bash
yarn add copy-webpack-plugin -D
```

- 在webpack.config.js配置

```js
/*webpack.config.js*/

const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  /*...*/
  // 插件
  plugins: [
    /*...*/
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
```

- 启动项目，样式清除

##### 按需引入antd

- 安装antd

```
yarn add antd
```

- 按需引入样式 （暂时不理解babel-plugin-import 实现自动按需引入）

  > 在.babel中加入以下代码

```js
 "plugins": [
    ["@babel/plugin-transform-runtime",{
      "corejs": 2, // polyfill 需要使用@babel/runtime-corejs2
      "useBuildIns":"usage", //按需引入,即使用什么新特性打包什么新特性, 可以减小打包的体积
    }],
    ["import", {
      "libraryName": "antd",
      "libraryDirectory": "es",
      "style": "css" // `style: true` 会加载 less 文件
    }],
         ["@babel/plugin-proposal-decorators",{"legacy": true}], // 配置对装饰器的支持
    ["@babel/plugin-proposal-class-properties",{"loose":true}]    
  ]
```

- 启动项目 根据报错安装相关依赖 

！！！如不按需引入需每个文件手动引入antd样式 `import 'antd/dist/antd.css'`

##### 使用mobx管理数据

- 安装

```bash
yarn add mobx mobx-react -D
```

> `mobx`的基本用法请看这里[mobx](https://links.jianshu.com/go?to=https%3A%2F%2Fcn.mobx.js.org%2F)
> `mobx-react`是`mobx`和`react`的结合，提供`Provider`组件统一管理`mobx`数据；`inject`为`react`组件注入某个`mobx`实例；`observer`实现`mobx`实现`react`组件和`mobx`数据的双向绑定（和`react-redux`的`connect`差不多）等等

 **注意！！mobx6.0舍弃了装饰器@observevable 改为makeAutoObservable**

详情查看https://www.yuque.com/liquidbook/blog/gmq6ra

