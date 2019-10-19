import {Schema, model, ObjectId, schemaOption, makeEnum} from './mongo'

export const UserProductSchema = new Schema({
  user: {type: ObjectId, ref: 'User'},
  product: {type: ObjectId, ref: 'Product'},
  role: {type: Number, default: Number},
  status: { type: Number, default: Number },
  createdBy : { type: ObjectId, ref: 'User' },
  updatedBy : { type: ObjectId, ref: 'User' },
  createdAt : { type: Date, default: Date.now },
  updatedAt : { type: Date, default: Date.now },
})

UserProductSchema.index({user: 1, product: 1}, {unique: true})

makeEnum(UserProductSchema, 'role', 'roleEnum', [
  'reader', // 读取项目
  'writer', // 写入项目
  'master', // 管理项目及该组
  'owner'  // 所有者
])

export const UserProductModel =  model('UserProduct', UserProductSchema)
