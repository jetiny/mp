import {createUser} from '../services/user'
import {UserModel} from '../models/user'
import { getObjectId } from './util'

export function emptyUsers() {
  return UserModel.deleteMany({})
}

export function ensureUnusedUsers() {
  return Promise.all([
    { nick: '赵六'},
    { nick: '钱七'},
    { nick: '孙八'},
  ].map((it, id) => {
    return createUser(Object.assign({
      _id: getObjectId(),
      name: `un${id+1}`,
      nick: it.nick,
      email: `un${id+1}@xx.xx`,
      password: 'x',
    }))
  }))
}

export function ensuerSomeUser() {
  return Promise.all([
    { nick: '张三'},
    { nick: '李四'},
    { nick: '王五'},
  ].map((it, id) => {
    return createUser(Object.assign({
      _id: getObjectId(),
      name: `u${id+1}`,
      nick: it.nick,
      email: `u${id+1}@xx.xx`,
      password: 'x',
    }))
  }))
}
