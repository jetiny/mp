import {ProductModel} from '../models/product'
import {ProductUserModel, ProductUserRole} from '../models/productUser'
import {ObjectID} from 'mongodb'
import { createId, isObjectId } from '../models/mongo'

/**
 * 创建一个产品
 */
export async function createProduct (input: {
  title: string,
  description: string,
  team: string | ObjectID,
  userId: string | ObjectID
}) {
  let ref = new ProductModel(Object.assign(input, {
    status: 0,
    teamStatus: 0,
    createdBy: isObjectId(input.userId) || createId(input.userId as string),
    createdAt: new Date(),
    updatedBy: isObjectId(input.userId) || createId(input.userId as string),
    updatedAt: new Date(),
  }))
  return ref.save()
}
/**
 * 更新一个产品
 */
export async function updateProduct (input: {
  title: string,
  description: string,
  id: string | ObjectID,
  userId: string | ObjectID
}) {
  let id = isObjectId(input.id) || createId(input.id as string)
  return ProductModel.findOneAndUpdate({_id: id}, {
    title: input.title,
    description: input.description,
    updatedBy: isObjectId(input.userId) || createId(input.userId as string),
    updatedAt: new Date(),
  }, {new: true}).exec()
}

/**
 * 更新产品状态
 */
export async function updateProductStatus (input: {
  id: string | ObjectID,
  status: number,
  userId: string | ObjectID
}) {
  let id = isObjectId(input.id) || createId(input.id as string)
  return ProductModel.findOneAndUpdate({
    _id: id
  }, {$set: {
    status: input.status,
    updatedBy: isObjectId(input.userId) || createId(input.userId as string),
    updatedAt: new Date(),
  }}, {new: true}).exec()
}

/**
 * 关联用户和产品
 */
export async function addUserToProduct(input: {
  product:  string | ObjectID,
  team:  string | ObjectID,
  user: string | ObjectID,
  userId: string | ObjectID,
  role: number
}) {
  let ref = new ProductUserModel(Object.assign(input, {
    status: 0,
    team: isObjectId(input.team) || createId(input.team as string),
    teamStatus: 0,
    productStatus: 0,
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

/**
 * 获取用户的所有产品
 */
export async function getProductUsers(input: {
  product: string | ObjectID,
}) {
  let product = input.product ? (isObjectId(input.product) || createId(input.product as string)) : null
  let productUsers = await ProductUserModel.find({
    status: 0,
    teamStatus: 0,
    productStatus: 0,
    product,
  }).select({
    id: 1,
    createdAt: 1,
    role: 1,
    user: 1,
    product: 1,
    team: 1,
  }).populate([
    {path: 'product', select: {
      id: 1,
      title: 1,
      description: 1,
      createdAt: 1,
      updatedAt: 1,
      team: 1,
    }},
    {path: 'team', select: {
      id: 1,
      title: 1,
    }},
    {path: 'user', select: {
      id: 1,
      name: 1,
      nick: 1,
    }},
  ]).exec()
  return productUsers
}

export async function getProductUserList(input: {
  product: string | ObjectID,
}) {
  let product = input.product ? (isObjectId(input.product) || createId(input.product as string)) : null
  let productUsers = await ProductUserModel.find({
    status: 0,
    teamStatus: 0,
    productStatus: 0,
    product,
  }).select({
    role: 1,
    user: 1,
  }).populate([
    {path: 'user', select: {
      id: 1,
      name: 1,
      nick: 1,
    }},
  ]).exec()
  return productUsers.map(it => it.user)
}

/**
 * 更新用户在Product中的状态
 */
export async function updateProductUserStatus (input: {
  id?: string | ObjectID,
  product?:  string | ObjectID,
  user?: string | ObjectID,
  status: number,
  userId: string | ObjectID
}) {
  return ProductUserModel.findOneAndUpdate(
    input.id ? {
      _id: (isObjectId(input.id) || createId(input.id as string))
    }:
    {
      product: isObjectId(input.product) || createId(input.product as string),
      user: isObjectId(input.user) || createId(input.user as string),
    },{
      status: input.status,
      updatedBy: isObjectId(input.userId) || createId(input.userId as string),
      updatedAt: new Date(),
    }).exec()
}

/**
 * 更新用户在Produt中的角色
 */
export async function updateProductUserRole (input: {
  id?: string | ObjectID,
  product?:  string | ObjectID,
  user?: string | ObjectID,
  role: number,
  userId: string | ObjectID
}) {
  return ProductUserModel.findOneAndUpdate(
    input.id ? {
      _id: (isObjectId(input.id) || createId(input.id as string))
    }:
    {
      product: isObjectId(input.product) || createId(input.product as string),
      user: isObjectId(input.user) || createId(input.user as string),
    },{
      role: input.role,
      updatedBy: isObjectId(input.userId) || createId(input.userId as string),
      updatedAt: new Date(),
    }).exec()
}

/**
 * 获取用户的所有产品
 */
export async function getUserProducts(input: {
  user: string | ObjectID,
  team?: string | ObjectID,
}) {
  let team = input.team ? (isObjectId(input.team) || createId(input.team as string)) : null
  let products = await ProductUserModel.find(Object.assign({
    status: 0,
    teamStatus: 0,
    productStatus: 0,
    role: {
      $ne: ProductUserRole.Leaved
    },
    user: isObjectId(input.user) || createId(input.user as string),
  }, team ? {
    team
  }: {})).select({
    id: 1,
    createdAt: 1,
    role: 1,
    user: 1,
    product: 1,
    team: 1,
  }).populate([
    {path: 'product', select: {
      id: 1,
      title: 1,
      description: 1,
      createdAt: 1,
      updatedAt: 1,
      team: 1,
    }},
    {path: 'team', select: {
      id: 1,
      title: 1,
    }},
  ]).exec()
  return products
}

/**
 * 获取Team所有产品
 */
export async function getTeamsProducts(input: {
  teams: ObjectID[],
}) {
  let products = await ProductModel.find({
    status: 0,
    teamStatus: 0,
    team: {
      $in: input.teams
    },
  }).populate([
    {path: 'product'},
  ]).exec()
  return products
}

/**
 * 获取用户在Product中的角色
 */
export async function getUserProductRole(input: {
  product: string | ObjectID,
  user: string | ObjectID,
}) {
  return ProductUserModel.findOne({
    status: 0,
    user: isObjectId(input.user) || createId(input.user as string),
    product: isObjectId(input.product) || createId(input.product as string),
  }).exec()
}

/**
 * 确保用户有产品权限
 */
export async function ensureUserProductRole(input: {
  product: string | ObjectID,
  user: string | ObjectID,
}, roles: ProductUserRole[]) {
  let userProduct = await getUserProductRole(input)
  if (!userProduct) {
    throw new Error('Product not found')
  }
  if (roles.indexOf(userProduct.role) === -1) {
    throw new Error('unauthorized operation')
  }
}
