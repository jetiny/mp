import {Schema, model, ObjectId, schemaOption} from './mongo'

export const StageSchema = new Schema({
  title: { type: String },
  description: { type: String },
  color: { type: String },
  code: { type: String },
  status: { type: Number, default: Number },
  createdBy : { type: ObjectId, ref: 'User' },
  updatedBy : { type: ObjectId, ref: 'User' },
  createdAt : { type: Date, default: Date.now },
  updatedAt : { type: Date, default: Date.now },
}, schemaOption())

export const StageModel = model('Stage', StageSchema)

export const IterationStageSchema = new Schema({
  title: { type: String },
  description: { type: String },
  color: { type: String },
  code: { type: String },
  status: { type: Number, default: Number },
  iteration : { type: ObjectId, ref: 'Iteration' },
  stage : { type: ObjectId, ref: 'Stage' },
  // 预估开始时间
  prepareStartDate : { type: Date, default: Date.now },
  prepareEndDate : { type: Date, default: Date.now },
  // 实际开始时间
  realStartDate : { type: Date, default: Date.now },
  realEndDate : { type: Date, default: Date.now },
  createdBy : { type: ObjectId, ref: 'User' },
  updatedBy : { type: ObjectId, ref: 'User' },
  createdAt : { type: Date, default: Date.now },
  updatedAt : { type: Date, default: Date.now },
}, schemaOption())

export const IterationStageModel = model('IterationStage', IterationStageSchema)
