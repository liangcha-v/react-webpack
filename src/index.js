import React, { useState } from 'react';
import ReactDOM from 'react-dom'
import AppRouter from "./router"
import { Provider } from "mobx-react"
import store from '../common/comstore'

function App() {
  // 声明一个新的叫做 “count” 的 state 变量
  const [count, setCount] = useState(0);
  return (
    <Provider {...store}>
      <AppRouter />
    </Provider>
  );
}


ReactDOM.render(<App />, document.getElementById('root'));