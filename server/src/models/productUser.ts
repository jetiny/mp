import {Schema, model, ObjectId, schemaOption} from './mongo'

export const ProductUserSchema = new Schema({
  user: {type: ObjectId, ref: 'User'},
  product: {type: ObjectId, ref: 'Product'},
  role: {type: Number, default: Number},
  status: { type: Number, default: Number },
  team: {type: ObjectId, ref: 'Team'},
  teamStatus: { type: Number, default: Number },
  productStatus: { type: Number, default: Number },
  createdBy : { type: ObjectId, ref: 'User' },
  updatedBy : { type: ObjectId, ref: 'User' },
  createdAt : { type: Date, default: Date.now },
  updatedAt : { type: Date, default: Date.now },
}, schemaOption())

ProductUserSchema.index({user: 1, product: 1}, {unique: true})

export enum ProductUserRole {
  Reader,
  Writer,
  Master,
  Owner,
  Leaved,
}

export const ProductUserModel =  model('ProductUser', ProductUserSchema)
