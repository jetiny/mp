import {Schema, model, ObjectId, schemaOption} from './mongo'

export const ProductSchema = new Schema({
  title: { type: String },
  description: { type: String },
  team: {type: ObjectId, ref: 'Team'},
  status: { type: Number, default: Number },
  teamStatus: { type: Number, default: Number },
  createdBy : { type: ObjectId, ref: 'User' },
  updatedBy : { type: ObjectId, ref: 'User' },
  createdAt : { type: Date, default: Date.now },
  updatedAt : { type: Date, default: Date.now },
}, schemaOption())

export const ProductModel = model('Product', ProductSchema)
