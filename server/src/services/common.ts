import {ObjectID} from 'mongodb'
import {ProductModel} from '../models/product'
import {ProductUserModel} from '../models/productUser'
import { updateTeamStatus } from './team'
import { isObjectId, createId } from '../models/mongo'
import {updateProductStatus} from './product'

/**
 * 删除团队
 * 删除团队的产品
 * 删除团队用户的产品
 */
export async function deleteTeam(input: {
  id: string | ObjectID,
  status: number,
  userId: string | ObjectID
}) {
  let teamId = isObjectId(input.id) || createId(input.id as string)
  let updatedBy = isObjectId(input.userId) || createId(input.userId as string)
  let updatedAt = new Date()
  let tm = await updateTeamStatus(input)
  let pm = await ProductModel.updateMany({
    team: teamId
  }, {
    teamStatus: input.status,
    updatedBy,
    updatedAt,
  }).exec()
  let pum = await ProductUserModel.updateMany({
    team: teamId
  }, {
    teamStatus: input.status,
    updatedBy,
    updatedAt,
  }).exec()
  return {
    tm,
    pm,
    pum
  }
}

/**
 * 删除产品
 * 删除产品的用户
 */
export async function deleteProduct(input: {
  id: string | ObjectID,
  status: number,
  userId: string | ObjectID
}) {
  let productId = isObjectId(input.id) || createId(input.id as string)
  let updatedBy = isObjectId(input.userId) || createId(input.userId as string)
  let updatedAt = new Date()
  let pr = await updateProductStatus(input)
  let pum = await ProductUserModel.updateMany({
    product: productId
  }, {
    productStatus: input.status,
    updatedBy,
    updatedAt,
  }).exec()
  return {
    pr,
    pum
  }
}
