import * as mongoose from 'mongoose'
import {Schema, Types, Query, SchemaTypes} from 'mongoose'
import * as crypto from 'crypto'
import * as moment from 'moment'
import {v1, v4} from 'node-uuid'
import * as libPinyin from 'pinyin'
// import mongooseDeepPopulate from 'mongoose-deep-populate'
mongoose.set('useCreateIndex', true) //加上这个
mongoose.set('useFindAndModify', false) //加上这个

// mongoose.Promise = Promise
export const connect = mongoose.connect.bind(mongoose)
export const model = mongoose.model.bind(mongoose)
// export const deepPopulate = mongooseDeepPopulate(mongoose)
export {Schema}
export {Types}
export {Query}
export {SchemaTypes}
export const ObjectId = mongoose.SchemaTypes.ObjectId
export const createId = Types.ObjectId
export const isObjectId = (obj) => {
  return obj && obj instanceof Types.ObjectId
}
// 已存在索引错误
export function isUniqueError (err) {
  return err && err.name === 'MongoError' &&
      (err.code === 11000 || err.code === 11001)
}

// 格式化时间
export function formatDate (date, format = 'YYYY-MM-DD HH:mm') {
  return moment(date).format(format)
}
// 基于时间戳生成uuid
export const uuid = v1
// 随机生成uuid
export const randId = v4
export function md5 (str) {
  return crypto.createHash('md5').update(str).digest('hex');
}

const code_string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

// 生成随机字符串
export function randStr (size = 6) {
  const max_num = code_string.length - 1
  let new_pass = ''
  while (size > 0) {
    new_pass += code_string.charAt(Math.round(Math.random() * max_num))
    size--
  }
  return new_pass
}

export function pinyin (str) {
  return libPinyin(str, {style: libPinyin.STYLE_NORMAL}).reduce((str, arr) => {
    return str + arr.shift()
  }, '')
}

const COMPLEX_BEGIN = /^\s*\//
const COMPLEX_REGEX = /^\s*\/(.+)\/(\w*)\s*$/

function parseWithFlags(fullPattern) {
  try {
    let [ , pattern, flags ] = fullPattern.match(COMPLEX_REGEX)
    return flags
      ? new RegExp(pattern, flags)
      : new RegExp(pattern)
  } catch (e) {
    throw new Error(`Invalid pattern “${fullPattern}”.`)
  }
}

export function toRegExp (pattern) {
  return COMPLEX_BEGIN.test(pattern)
    ? parseWithFlags(pattern)
    : new RegExp(pattern)
}

export function schemaOption (opts : any = {}) {
  let {exclude} = opts
  delete opts.exclude
  let toObject = {
    getters: true,
    virtuals: true,
    versionKey: false,
    transform (doc, ret) {
      Object.defineProperty(ret, '_id', {
        enumerable: false,
        configurable: true,
        value: ret._id
      })
      // delete ret._id
      if (exclude) {
        exclude.forEach(it => delete ret[it])
      }
    }
  }
  let ret = {
    id: true,
    toObject,
    toJSON: toObject
  }
  return Object.assign(ret, opts)
}

let QueryProto = Query.prototype as any

QueryProto.pagging = function (input) {
  let res = this
  if (input) {
    let {limit, page} = input
    if (!limit || (limit > 100)) {
      limit = 10
    }
    res.limit(limit)
    if (page > 1) {
      res.skip((page - 1) * limit)
    }
  }
  return res
}

export function makeEnum(schema: any, field: string, name: string, enums: any[]) {
  schema.set('toJSON', { virtuals: true })
  let virtual = schema.virtual(name)
  virtual.get(function () {
    return enums[schema[field]]
  })
  virtual.set(function (val) {
    schema[field] = enums.indexOf(val)
  })
  schema[`${name}Val`] = schema.statics[`${name}Val`] = (val) => enums.indexOf(val)
  schema[`${name}Key`] = schema.statics[`${name}Key`] = (val) => enums[val]
}
