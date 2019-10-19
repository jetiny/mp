import {Schema, model, md5, randId, pinyin, toRegExp, schemaOption} from './mongo'

export const UserSchema = new Schema({
  name: { type: String, unique: true },
  nick: { type: String },
  nick_pinyin: { type: String },
  email: { type: String, unique: true },
  password: { type: String, default () {
    return md5(randId())
  }},
  status: { type: Number, default: Number },
  createdAt : { type: Date, default: Date.now },
  updatedAt : { type: Date, default: Date.now },
}, schemaOption({
  exclude: ['password']
}))

export const UserModel = model('User', UserSchema)

UserModel.login = (account, password) => {
  return UserModel.findOne({
    password: md5(password),
    $or: [
      { name:  { $eq: account } },
      { email: { $eq: account } }
    ],
    status: 0
  })
}

UserModel.register = async (name, email, password, nick) => {
  let user = new UserModel({
    name: name,
    email: email,
    nick,
    nick_pinyin: pinyin(nick),
    password: md5(password),
  })
  return user.save()
}

UserModel.findUser = async (name, limit = 10) => {
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
  }).limit(limit)
}

