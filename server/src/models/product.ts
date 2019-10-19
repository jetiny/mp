import {Schema, model, ObjectId} from './mongo'

export const ProductSchema = new Schema({
  title: { type: String },
  description: { type: String },
  status: { type: Number, default: Number },
  createdBy : { type: ObjectId, ref: 'User' },
  updatedBy : { type: ObjectId, ref: 'User' },
  createdAt : { type: Date, default: Date.now },
  updatedAt : { type: Date, default: Date.now },
})

export const ProductModel = model('Product', ProductSchema)
