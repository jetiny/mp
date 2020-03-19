import {StageModel, IterationStageModel} from '../models/stage'
import {ObjectID} from 'mongodb'
import { createId, isObjectId } from '../models/mongo'

export async function insertStage (input: {
  userId: string | ObjectID,
  title: string,
  description: string,
  color: string,
  code: string,
}) {
  let ref = new StageModel(Object.assign(input, {
    status: 0,
    title: input.title,
    description: input.description,
    color: input.color,
    code: input.code,
    createdBy: isObjectId(input.userId) || createId(input.userId as string),
    createdAt: new Date(),
    updatedBy: isObjectId(input.userId) || createId(input.userId as string),
    updatedAt: new Date(),
  }))
  return ref.save()
}

export async function updateStageStatus (input: {
  id: string | ObjectID,
  status: number,
  userId: string | ObjectID
}) {
  let id = isObjectId(input.id) || createId(input.id as string)
  return StageModel.findOneAndUpdate({_id: id}, {
    status: input.status,
    updatedBy: isObjectId(input.userId) || createId(input.userId as string),
    updatedAt: new Date(),
  }, {new: true}).exec()
}

export async function listStages() {
  return await StageModel.find({
    status: 0,
  }).exec()
}

export async function listIterationsStages(input: {
  iteration: string[] | ObjectID[],
}) {
  return await IterationStageModel.find({
    status: 0,
    iteration: {
      $in: (input.iteration as any).map(it => isObjectId(it) || createId(it as string))
    },
  }).exec()
}

export async function insertIterationStage (input: {
  userId: string | ObjectID,
  iteration: string | ObjectID,
  stage: string | ObjectID,
  title: string,
  description: string,
  color: string,
  code: string,
  prepareStartDate?: string | Date,
  prepareEndDate?: string | Date,
  realStartDate?: string | Date,
  realEndDate?: string | Date,
}) {
  let ref = new IterationStageModel(Object.assign(input, {
    status: 0,
    title: input.title,
    description: input.description,
    color: input.color,
    code: input.code,
    prepareStartDate: input.prepareStartDate ? new Date(input.prepareStartDate): null,
    prepareEndDate: input.prepareEndDate ? new Date(input.prepareEndDate): null,
    realStartDate: input.realStartDate ? new Date(input.realStartDate): null,
    realEndDate: input.realEndDate ? new Date(input.realEndDate): null,
    iteration: isObjectId(input.iteration) || createId(input.iteration as string),
    stage: isObjectId(input.stage) || createId(input.stage as string),
    createdBy: isObjectId(input.userId) || createId(input.userId as string),
    createdAt: new Date(),
    updatedBy: isObjectId(input.userId) || createId(input.userId as string),
    updatedAt: new Date(),
  }))
  return ref.save()
}
