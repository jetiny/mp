import {TaskModel, TaskStatus} from '../models/task'
import {ObjectID} from 'mongodb'
import { createId, isObjectId } from '../models/mongo'

/**
 * 创建一个迭代
 */
export async function createTask (input: {
  title: string,
  content: string,
  taskStatus?: number,
  estimateHours?: number,
  prepareStartDate?: string | Date,
  prepareEndDate?: string | Date,
  realStartDate?: string | Date,
  realEndDate?: string | Date,
  assignUser?: string | ObjectID,
  product: string | ObjectID,
  team: string | ObjectID,
  iteration: string | ObjectID,
  iterationStage?: string | ObjectID,
  userId: string | ObjectID
}) {
  let datas =  {
    assignUser: null,
    assignAt: null,
    product: isObjectId(input.product) || createId(input.product as string),
    team: isObjectId(input.team) || createId(input.team as string),
    title: input.title,
    content: input.content,
    status: 0,
    estimateHours: input.estimateHours || 0,
    taskStatus: input.taskStatus || TaskStatus.Backlog,
    prepareStartDate: input.prepareStartDate ? new Date(input.prepareStartDate) : null,
    prepareEndDate: input.prepareEndDate ? new Date(input.prepareEndDate) : null,
    realStartDate: input.realStartDate ? new Date(input.realStartDate) : null,
    realEndDate: input.realEndDate ? new Date(input.realEndDate) : null,
    iteration: isObjectId(input.iteration) || createId(input.iteration as string),
    iterationStage: null,
    deps: [],
    childs: [],
    createdBy: isObjectId(input.userId) || createId(input.userId as string),
    createdAt: new Date(),
    updatedBy: isObjectId(input.userId) || createId(input.userId as string),
    updatedAt: new Date(),
  };

  if (input.assignUser) {
    datas.assignUser = isObjectId(input.assignUser) || createId(input.assignUser as string)
    datas.assignAt = new Date()
  }
  if (input.iterationStage) {
    datas.iterationStage = isObjectId(input.iterationStage) || createId(input.iterationStage as string)
  }
  let ref = new TaskModel(Object.assign(input, datas))
  return ref.save()
}

/**
 * 更新状态
 */
export async function updateTaskStatus (input: {
  id: string | ObjectID,
  status: number,
  userId: string | ObjectID
}) {
  let id = isObjectId(input.id) || createId(input.id as string)
  return TaskModel.findOneAndUpdate({_id: id}, {
    status: input.status,
    updatedBy: isObjectId(input.userId) || createId(input.userId as string),
    updatedAt: new Date(),
  }, {new : true}).exec()
}

export async function listTasks(input: {
  taskStatus?: TaskStatus | number,
  assignUser?: string | ObjectID,
  createdBy?: string | ObjectID,
  iterationStage?: string | ObjectID,
  iteration?: string | ObjectID,
  product?: string | ObjectID,
  team?: string | ObjectID,
}) {
  let datas : any = {}
  if (input.iterationStage) {
    datas.iterationStage = isObjectId(input.iterationStage) || createId(input.iterationStage as string)
  }
  if (input.assignUser) {
    datas.assignUser = isObjectId(input.assignUser) || createId(input.assignUser as string)
  }
  if (input.taskStatus) {
    datas.taskStatus = input.taskStatus
  }
  if (input.iteration) {
    datas.iteration = isObjectId(input.iteration) || createId(input.iteration as string)
  }
  if (input.product) {
    datas.product = isObjectId(input.product) || createId(input.product as string)
  }
  if (input.team) {
    datas.team = isObjectId(input.team) || createId(input.team as string)
  }
  if (input.createdBy) {
    datas.createdBy = isObjectId(input.createdBy) || createId(input.createdBy as string)
  }
  let tasks = await TaskModel.find(Object.assign({
    status: 0,
  }, datas)).populate([
    {path: 'updatedBy', select: {id: 1, name: 1, nick: 1}},
    {path: 'createdBy', select: {id: 1, name: 1, nick: 1}},
    {path: 'assignUser', select: {id: 1, name: 1, nick: 1}},
    {path: 'product', select: {id: 1, title: 1}},
    {path: 'iteration', select: {id: 1, title: 1}},
    {path: 'iterationStage', select: {id: 1, title: 1}},
  ]).pagging(input).exec();
  return tasks
}

/**
 * 更新一个迭代
 */
export async function updateTask (input: {
  title?: string,
  content?: string,
  id: string | ObjectID,
  userId: string | ObjectID,
  prepareStartDate?: string | Date,
  prepareEndDate?: string | Date,
  realStartDate?: string | Date,
  realEndDate?: string | Date,
  iterationStage?: string | ObjectID,
  assignUser?: string | ObjectID,
  childs?: string[] | ObjectID[],
  deps?: string[] | ObjectID[],
  estimateHours?: number,
  taskStatus?: TaskStatus | number,
}) {
  let id = isObjectId(input.id) || createId(input.id as string)
  let datas = {};
  ['title', 'content', 'childs', 'deps', 'estimateHours'].forEach(key => {
    if (input[key]) {
      datas[key] = input[key]
    }
  });
  ['prepareStartDate', 'prepareEndDate', 'realStartDate', 'realEndDate'].forEach(key => {
    if (key in input ) {
      datas[key] = input[key] ? new Date(input[key]) : null
    }
  });
  if (input.iterationStage) {
    datas['iterationStage'] = isObjectId(input.iterationStage) || createId(input.iterationStage as string)
  }
  if (input.assignUser) {
    datas['assignUser'] = isObjectId(input.assignUser) || createId(input.assignUser as string)
    datas['assignAt'] = new Date()
  }
  if (input.taskStatus) {
    datas['taskStatus'] = input.taskStatus
  }
  return TaskModel.findOneAndUpdate({_id: id}, Object.assign(datas, {
    updatedBy: isObjectId(input.userId) || createId(input.userId as string),
    updatedAt: new Date(),
  }), {new: true}).exec()
}
