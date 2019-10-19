import {createUser} from '../services/user'
import {UserModel} from '../models/user'

export function emptyUsers() {
  return UserModel.deleteMany({})
}

export function ensuerSomeUser() {
  return Promise.all([
    { nick: '张三'},
    { nick: '李四'},
    { nick: '王五'},
  ].map((it, id) => {
    return createUser({
      name: `u${id+1}`,
      nick: it.nick,
      email: `u${id+1}@xx.xx`,
      password: 'x',
    })
  }))
}
