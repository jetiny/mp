import {Schema, model, ObjectId, schemaOption} from './mongo'

export const TeamSchema = new Schema({
  title: { type: String },
  description: { type: String },
  status: { type: Number, default: Number },
  createdBy : { type: ObjectId, ref: 'User' },
  updatedBy : { type: ObjectId, ref: 'User' },
  createdAt : { type: Date, default: Date.now },
  updatedAt : { type: Date, default: Date.now },
}, schemaOption())

export const TeamModel = model('Team', TeamSchema)
