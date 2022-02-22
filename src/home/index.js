import React, { useState, Component } from 'react';
import { Button } from 'antd';
import "./index.less"
import { inject, observer } from 'mobx-react'

@inject("UserListStore") // 注入mobx实例到props
@observer // UserListStore实例和组件双向绑定

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      n: true
    }
  }

  setName = () => {
    const { UserListStore } = this.props;
    let { n } = this.state;
    if (n) {
      UserListStore.setName("ooolzz")
    } else {
      UserListStore.setName("jjkll")
    }
    this.setState(prevState => ({
      n: !prevState.n
    }))
  }


  render() {
    let { UserListStore } = this.props;
    return (
      <div>
        <div className="red green">Home</div>
        <div className="red green">{UserListStore.name}</div>
        <Button type="primary"
          onClick={() => { this.setName() }}>
          点击
        </Button>
      </div >
    );
  }
}
export default Home