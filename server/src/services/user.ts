import {UserModel} from '../models/user'
import {md5, pinyin, toRegExp} from '../models/mongo'

export async function createUser (input: {
  name: string
  nick?: string
  email: string
  password: string
}) {
  let ref = new UserModel(Object.assign(input, {
    nick: input.nick || input.name,
    nick_pinyin: pinyin(input.nick || input.name),
    password: md5(input.password),
    createdAt: new Date(),
    updatedAt: new Date(),
  }))
  return ref.save()
}

export async function loginUser (input: {
  password: string
  account: string
}) {
  return UserModel.findOne({
    password: md5(input.password),
    $or: [
      { name:  { $eq: input.account } },
      { email: { $eq: input.account } }
    ],
    status: 0
  })
}

export async function searchUser (name, input) {
  let pinyin_name = pinyin(name)
  let isEmail = name.indexOf('@') !== -1
  let isPinyin = pinyin_name !== name
  let $or = []
  // @TODO 使用全文索引库 lucene,solr,elasticsearch 等
  if (isEmail) {
    // 如果是email则根据email模糊查找
    $or.push({email: toRegExp(`^/${name}/i`)})
  } else if (isPinyin) {
    // 如果是拼音则根据拼音模糊查找nick
    $or.push({nick_pinyin: toRegExp(`/${pinyin_name}/i`)})
  } else {
    // 如果是英文则根据英文模糊查找 name email nick
    let re = toRegExp(`/${name}/i`)
    $or.push({name: re})
    $or.push({email: re})
    $or.push({nick_pinyin: re})
  }
  return UserModel.find({
    $or,
    status: 0
  }).pagging(input).exec()
}
