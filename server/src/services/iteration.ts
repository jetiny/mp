import {IterationModel, IterationStatus} from '../models/iteration'
import {ObjectID} from 'mongodb'
import { createId, isObjectId } from '../models/mongo'
// import { listIterationsStages } from './stage'

/**
 * 创建一个迭代
 */
export async function createIteration (input: {
  title: string,
  version: string,
  description: string,
  prepareStartDate: string | Date,
  prepareEndDate: string | Date,
  product: string | ObjectID,
  team: string | ObjectID,
  userId: string | ObjectID
}) {
  let ref = new IterationModel(Object.assign(input, {
    product: isObjectId(input.product) || createId(input.product as string),
    team: isObjectId(input.team) || createId(input.team as string),
    status: 0,
    productStatus: 0,
    teamStatus: 0,
    iterationStatus: IterationStatus.Backlog,
    prepareStartDate: new Date(input.prepareStartDate),
    prepareEndDate: new Date(input.prepareEndDate),
    realStartDate: null,
    realEndDate: null,
    stages: [],
    createdBy: isObjectId(input.userId) || createId(input.userId as string),
    createdAt: new Date(),
    updatedBy: isObjectId(input.userId) || createId(input.userId as string),
    updatedAt: new Date(),
  }))
  return ref.save()
}

/**
 * 更新状态
 */
export async function updateIterationStatus (input: {
  id: string | ObjectID,
  status: number,
  userId: string | ObjectID
}) {
  let id = isObjectId(input.id) || createId(input.id as string)
  return IterationModel.findOneAndUpdate({_id: id}, {
    status: input.status,
    updatedBy: isObjectId(input.userId) || createId(input.userId as string),
    updatedAt: new Date(),
  }, {new : true}).exec()
}

export async function listProductIterations(input: {
  product: string | ObjectID
}) {
  let iterations = await IterationModel.find({
    status: 0,
    productStatus: 0,
    product: isObjectId(input.product) || createId(input.product as string)
  }).populate([
    {path: 'stages', select: {
      id: 1,
      color: 1,
      title: 1,
      status: 1,
      stage: 1,
      prepareStartDate: 1,
      prepareEndDate: 1,
      realStartDate: 1,
      realEndDate: 1,
    }},
  ]).exec();
  return iterations
}

/**
 * 更新一个迭代
 */
export async function updateIteration (input: {
  title?: string,
  description?: string,
  id: string | ObjectID,
  userId: string | ObjectID,
  prepareStartDate?: string | Date,
  prepareEndDate?: string | Date,
  realStartDate?: string | Date,
  realEndDate?: string | Date,
  stages?: string[] | ObjectID[],
}) {
  let id = isObjectId(input.id) || createId(input.id as string)
  let datas = {};
  ['title', 'description', 'stages'].forEach(key => {
    if (input[key]) {
      datas[key] = input[key]
    }
  });
  ['prepareStartDate', 'prepareEndDate', 'realStartDate', 'realEndDate'].forEach(key => {
    if (input[key]) {
      datas[key] = new Date(input[key])
    }
  });
  return IterationModel.findOneAndUpdate({_id: id}, Object.assign(datas, {
    updatedBy: isObjectId(input.userId) || createId(input.userId as string),
    updatedAt: new Date(),
  }), {new: true}).exec()
}
