import {Schema, model, ObjectId, schemaOption} from './mongo'

export const TaskSchema = new Schema({
  // 标题
  title: { type: String },
  // 内容
  content: { type: String },
  // 预估开始时间
  prepareStartDate : { type: Date, default: Date.now },
  prepareEndDate : { type: Date, default: Date.now },
  // 实际开始时间
  realStartDate : { type: Date, default: Date.now },
  realEndDate : { type: Date, default: Date.now },
  // 负责人
  assignUser : { type: ObjectId, ref: 'User' },
  assignAt : { type: Date, default: Date.now },
  // 关联团队
  team : { type: ObjectId, ref: 'Team' },
  // 关联产品
  product : { type: ObjectId, ref: 'Product' },
  // 关联迭代/项目
  iteration : { type: ObjectId, ref: 'Iteration' },
  // 关联阶段
  iterationStage : { type: ObjectId, ref: 'IterationStage' },
  // 预估小时
  estimateHours: { type: Number, default: Number },

  status: { type: Number, default: Number },
  // 任务状态
  taskStatus: { type: Number, default: Number },

  // 子任务
  deps : [{ type: ObjectId, ref: 'Task' }],
  childs : [{ type: ObjectId, ref: 'Task' }],

  createdBy : { type: ObjectId, ref: 'User' },
  updatedBy : { type: ObjectId, ref: 'User' },
  createdAt : { type: Date, default: Date.now },
  updatedAt : { type: Date, default: Date.now },
}, schemaOption() )

export enum TaskStatus {
  None,
  Backlog,
  Todo,
  Doing,
  Done,
}

export const TaskModel = model('Task', TaskSchema)
