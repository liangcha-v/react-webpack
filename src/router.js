import React from "react"
import { Route, BrowserRouter, Link, Routes } from "react-router-dom" //BrowserRouter as
import Home from "./home"
import Blog from "./blog"
import User from "./user"
class AppRouter extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <ul>
          <li><Link to="/">home</Link></li>
          <li><Link to="/blog">blog</Link></li>
          <li><Link to="/user">user</Link></li>
        </ul>
        <div style={{ background: 'red' }} >
          {/* Switch只显示一个组件。加exact表示精确匹配/。如果不加exact，/xxx也会匹配/。  */}
          <Routes  >
            {/* exact */}
            < Route path="/" element={<Home />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/user" element={<User />} />
          </Routes>
        </div >
      </BrowserRouter >
    )
  }
}
export default AppRouter;