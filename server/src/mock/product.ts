import {createProduct, addUserToProduct} from '../services/product'
import {ProductModel} from '../models/product'
import { ProductUserModel, ProductUserRole } from '../models/productUser'
import { getObjectId } from './util'

export function emptyProduct() {
  return ProductModel.deleteMany({})
}

export function emptyProductUser() {
  return ProductUserModel.deleteMany({})
}

export async function ensureSomeProduct(user: any, team: any) {
  return Promise.all([
    { title: '产品1'},
    { title: '产品2'},
    { title: '产品3'},
  ].map((it, id) => {
    return createProduct(Object.assign({
      _id: getObjectId(),
      title: it.title,
      description: `product${id+1}`,
      userId: user.id,
      team: team.id
    })).then(async (res) => {
      await addUserToProduct({
        team: team.id,
        product: res.id,
        userId: user.id,
        user: user.id,
        role: ProductUserRole.Owner
      })
      return res
    })
  }))
}
