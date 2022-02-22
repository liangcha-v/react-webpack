import { observable, action, runInAction, toJS, makeAutoObservable } from 'mobx'
class UserListStore {

  name = "jjkll;"

  constructor() {
    makeAutoObservable(this)
  }

  setName(name) {
    console.log(`%c----1233--->`, 'background:#00406a;font-size:25px;color:#fff', name);
    this.name = name;
  }
}

export default new UserListStore();