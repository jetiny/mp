import {Schema, model, ObjectId, makeEnum, schemaOption} from './mongo'

export const TeamUserSchema = new Schema({
  user: {type: ObjectId, ref: 'User'},
  team: {type: ObjectId, ref: 'Team'},
  role: {type: Number, default: Number},
  status: { type: Number, default: Number },
  createdBy : { type: ObjectId, ref: 'User' },
  updatedBy : { type: ObjectId, ref: 'User' },
  createdAt : { type: Date, default: Date.now },
  updatedAt : { type: Date, default: Date.now },
}, schemaOption({}))

TeamUserSchema.index({user: 1, team: 1}, {unique: true})

export enum TeamUserRole {
  Member,
  Master,
  Owner,
  Leaved,
}

export const TeamUserModel =  model('TeamUser', TeamUserSchema)
