import { makeAutoObservable } from 'mobx'
class UserListStore {

  name = "jjkll;" //mobx6新写法

  constructor() {
    makeAutoObservable(this) //mobx6新写法
  }

  setName(name) {
    console.log(`%c----1233--->`, 'background:#00406a;font-size:25px;color:#fff', name);
    this.name = name;
  }
}

export default new UserListStore();