import {ProjectModel} from '../models/project'
import {ObjectID} from 'mongodb'
import { createId, isObjectId } from '../models/mongo'

export async function insertProject (input: {
  userId: string | ObjectID,
  title: string,
  version: string,
  description: string,
  prepareStartDate : Date,
  prepareEndDate : Date,
  product : string | ObjectID,
}) {
  let ref = new ProjectModel(Object.assign(input, {
    status: 0,
    projectStatus: 0,
    product: isObjectId(input.product) || createId(input.product as string),
    createdBy: isObjectId(input.userId) || createId(input.userId as string),
    createdAt: new Date(),
    updatedBy: isObjectId(input.userId) || createId(input.userId as string),
    updatedAt: new Date(),
    realStartDate : null,
    realEndDate : null,
  }))
  return ref.save()
}

export async function updateProjectStatus (input: {
  id: string | ObjectID,
  status: number,
  userId: string | ObjectID
}) {
  let id = isObjectId(input.id) || createId(input.id as string)
  return ProjectModel.findOneAndUpdate(id, {
    status: input.status,
    updatedBy: isObjectId(input.userId) || createId(input.userId as string),
    updatedAt: new Date(),
  }).exec()
}

export async function updateProject(input: {
  id: string | ObjectID,
  title?: string,
  version?: string,
  description?: string,
  prepareStartDate?: Date,
  prepareEndDate?: Date,
  realStartDate?: Date,
  realEndDate?:Date,
  userId: string | ObjectID
}) {
  let id = isObjectId(input.id) || createId(input.id as string)
  return ProjectModel.findOneAndUpdate(id, Object.assign(input, {
    id: id,
    updatedBy: isObjectId(input.userId) || createId(input.userId as string),
    updatedAt: new Date(),
  })).exec()
}
