import {Schema, model, ObjectId, makeEnum} from './mongo'

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
  bindUser : { type: ObjectId, ref: 'User' },
  bindAt : { type: Date, default: Date.now },
  // 关联团队
  team : { type: ObjectId, ref: 'Team' },
  // 关联产品
  product : { type: ObjectId, ref: 'Product' },
  // 关联迭代/项目
  project : { type: ObjectId, ref: 'Project' },

  status: { type: Number, default: Number },
  // 任务状态
  taskStatus: { type: Number, default: Number },

  // 子任务
  deps : { type: ObjectId, ref: 'Task' },

  createdBy : { type: ObjectId, ref: 'User' },
  updatedBy : { type: ObjectId, ref: 'User' },
  createdAt : { type: Date, default: Date.now },
  updatedAt : { type: Date, default: Date.now },
})

makeEnum(TaskSchema, 'taskStatus', 'taskStatusEnum', [
  'unset', // 未设置, backlog中
  'todo',  // 预备处理
  'doing', // 处理中
  'done'   // 已结束
])

export const TaskModel = model('Task', TaskSchema)
