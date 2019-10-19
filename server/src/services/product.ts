import {ProductModel} from '../models/product'
import {UserProductModel} from '../models/userProduct'
import {ObjectID} from 'mongodb'
import { createId, isObjectId } from '../models/mongo'

export async function insertProduct (input: {
  title: string,
  description: string,
  userId: string | ObjectID
}) {
  let ref = new ProductModel(Object.assign(input, {
    status: 0,
    createdBy: isObjectId(input.userId) || createId(input.userId as string),
    createdAt: new Date(),
    updatedBy: isObjectId(input.userId) || createId(input.userId as string),
    updatedAt: new Date(),
  }))
  return ref.save()
}

export async function updateProductStatus (input: {
  id: string | ObjectID,
  status: number,
  userId: string | ObjectID
}) {
  let id = isObjectId(input.id) || createId(input.id as string)
  return ProductModel.findOneAndUpdate(id, {
    status: input.status,
    updatedBy: isObjectId(input.userId) || createId(input.userId as string),
    updatedAt: new Date(),
  }).exec()
}

export async function addUserToProduct(input: {
  product:  string | ObjectID,
  user: string | ObjectID,
  userId: string | ObjectID,
  role: number
}) {
  let ref = new UserProductModel(Object.assign(input, {
    status: 0,
    role: input.role,
    product: isObjectId(input.product) || createId(input.product as string),
    user: isObjectId(input.user) || createId(input.user as string),
    createdBy: isObjectId(input.userId) || createId(input.userId as string),
    createdAt: new Date(),
    updatedBy: isObjectId(input.userId) || createId(input.userId as string),
    updatedAt: new Date(),
  }))
  return ref.save()
}

export async function getUserProducts(input: {
  user: string | ObjectID,
}) {
  return UserProductModel.findAll({
    status: 0,
    user: isObjectId(input.user) || createId(input.user as string),
  }).exec()
}
