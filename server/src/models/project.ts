import {Schema, model, ObjectId, makeEnum} from './mongo'

export const ProjectSchema = new Schema({
  // 标题
  title: { type: String },
  // 版本号
  version: { type: String },
  // 描述
  description: { type: String },
  status: { type: Number, default: Number },
  // 项目状态
  projectStatus: { type: Number, default: Number },
  // 预估开始时间
  prepareStartDate : { type: Date, default: Date.now },
  prepareEndDate : { type: Date, default: Date.now },
  // 实际开始时间
  realStartDate : { type: Date, default: Date.now },
  realEndDate : { type: Date, default: Date.now },
  // 隶属产品
  product : { type: ObjectId, ref: 'Product' },
  createdBy : { type: ObjectId, ref: 'User' },
  updatedBy : { type: ObjectId, ref: 'User' },
  createdAt : { type: Date, default: Date.now },
  updatedAt : { type: Date, default: Date.now },
})

export enum ProjectStatus {
  Backlog,
  Todo,
  Doing,
  Done,
}

export const ProjectModel = model('Project', ProjectSchema)
