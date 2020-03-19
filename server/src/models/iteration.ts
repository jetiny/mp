import {Schema, model, ObjectId, makeEnum, schemaOption} from './mongo'

export const IterationSchema = new Schema({
  // 标题
  title: { type: String },
  // 版本号
  version: { type: String },
  // 描述
  description: { type: String },
  status: { type: Number, default: Number },
  // 项目状态
  iterationStatus: { type: Number, default: Number },
  // 预估开始时间
  prepareStartDate : { type: Date, default: Date.now },
  prepareEndDate : { type: Date, default: Date.now },
  // 实际开始时间
  realStartDate : { type: Date, default: Date.now },
  realEndDate : { type: Date, default: Date.now },
  // 隶属产品
  product : { type: ObjectId, ref: 'Product' },
  productStatus :  { type: Number, default: Number },
  stages: [{ type: ObjectId, ref: 'IterationStage'}],
  createdBy : { type: ObjectId, ref: 'User' },
  updatedBy : { type: ObjectId, ref: 'User' },
  createdAt : { type: Date, default: Date.now },
  updatedAt : { type: Date, default: Date.now },
}, schemaOption())

export enum IterationStatus {
  Backlog,
  Todo,
  Doing,
  Done,
}

export const IterationModel = model('Iteration', IterationSchema)
