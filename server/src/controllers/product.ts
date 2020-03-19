import * as Router from 'koa-router';
import {auth} from '../auth'
import {getProductUsers, getUserProducts, getUserProductRole, addUserToProduct, updateProductUserRole, updateProduct, ensureUserProductRole, getProductUserList} from '../services/product'
import { ProductUserRole } from '../models/productUser';
import { getUserTeams } from '../services/team';
import { deleteProduct } from '../services/common';
import { createIteration } from '../services/iteration';

export default function install (router: Router) {
  /**
   * 获取用户的产品列表
   */
  router.post('/product/getUserProducts', auth, async (ctx) => {
    let products = await getUserProducts({
      user: ctx.state.user.id
    })
    ctx.body = {
      products
    }
  });
  /**
   * 编辑Product
   */
  router.post('/product/updateProduct', auth,  async (ctx) => {
    let body = ctx.request.body

    await ensureUserProductRole({
      product: body.id,
      user: ctx.state.user.id,
    }, [ProductUserRole.Master, ProductUserRole.Owner])

    let product = await updateProduct({
      id: body.id,
      userId: ctx.state.user.id,
      title: body.title,
      description: body.description
    });
    ctx.body = {
      product
    }
  });
  /**
   * 获取Team和Product列表
   */
  router.post('/product/listTeamsProducts', auth, async (ctx) => {
    let teams = await getUserTeams({
      user: ctx.state.user.id
    });
    teams = teams.map(it => {
      return {
        id: it.team.id,
        title: it.team.title,
        updatedAt: it.team.updatedAt,
        createdAt: it.team.createdAt,
        role: it.role
      }
    });
    let userProducts = await getUserProducts({
      user: ctx.state.user.id
    })
    let products = userProducts.map(it => {
      return {
        id: it.product.id,
        title: it.product.title,
        updatedAt: it.product.updatedAt,
        createdAt: it.product.createdAt,
        parent: it.product.team,
        role: it.role
      }
    })
    ctx.body = {
      products: teams.concat(products)
    }
  });
  /**
   * 获取Team的产品列表
   */
  router.post('/product/getUserTeamProducts', auth, async (ctx) => {
    let userProducts = await getUserProducts({
      user: ctx.state.user.id,
      team: ctx.request.body.team
    })
    let products = userProducts.map(it => {
      return {
        id: it.product.id,
        title: it.product.title,
        updatedAt: it.product.updatedAt,
        createdAt: it.product.createdAt,
        parent: it.product.team,
        role: it.role
      }
    })
    ctx.body = {
      products
    }
  });
  /**
   * 获取产品的用户列表
   */
  router.post('/product/listProductUsers', auth,  async (ctx) => {
    let users = await getProductUsers({
      product: ctx.request.body.product
    });
    ctx.body = {
      users
    }
  });
  /**
   * 获取产品的用户列表
   */
  router.post('/product/getProductUserList', auth,  async (ctx) => {
    let users = await getProductUserList({
      product: ctx.request.body.product
    });
    ctx.body = {
      users
    }
  });
  /**
   * 产品添加用户
   */
  router.post('/product/addProductUser', auth,  async (ctx) => {
    let {product, user, role, team} = ctx.request.body
    let userProduct = await getUserProductRole({
      product,
      user: ctx.state.user.id
    })
    if (!userProduct) {
      throw new Error('Product not found')
    }
    if (!(userProduct.role === ProductUserRole.Master || (userProduct.role === ProductUserRole.Owner))) {
      throw new Error('unauthorized operation')
    }
    if ((role === ProductUserRole.Owner) && (userProduct.role !== ProductUserRole.Owner)) {
      throw new Error('unauthorized operation')
    }
    let productUser = await addUserToProduct({
      product,
      team,
      user,
      role,
      userId: ctx.state.user.id,
    });
    ctx.body = {
      user: productUser
    }
  });
  /**
   * 产品更新用户状态
   */
  router.post('/product/changeProductUserRole', auth,  async (ctx) => {
    let {product, user, role} = ctx.request.body
    let userProduct = await getUserProductRole({
      product,
      user: ctx.state.user.id
    })
    if (!userProduct) {
      throw new Error('Product not found')
    }
    if (!(userProduct.role === ProductUserRole.Master || (userProduct.role === ProductUserRole.Owner))) {
      throw new Error('unauthorized operation')
    }
    if ((role === ProductUserRole.Owner) && (userProduct.role !== ProductUserRole.Owner)) {
      throw new Error('unauthorized operation')
    }
    let productUser = await updateProductUserRole({
      product,
      user,
      role,
      userId: ctx.state.user.id,
    });
    ctx.body = {
      user: productUser
    }
  });
  /**
   * 删除产品
   */
  router.post('/product/deleteProduct', auth,  async (ctx) => {
    let {product} = ctx.request.body
    let userProduct = await getUserProductRole({
      product,
      user: ctx.state.user.id
    })
    if (!userProduct) {
      throw new Error('Team not found')
    }
    if (!(userProduct.role === ProductUserRole.Owner)) {
      throw new Error('unauthorized operation')
    }
    let {pr} = await deleteProduct({
      id: product,
      status: 1,
      userId: ctx.state.user.id
    })
    ctx.body = {
      product: pr
    }
  });
  /**
   * 创建迭代
   */
  router.post('/product/createIteration', auth,  async (ctx) => {
    let body = ctx.request.body
    let iteration = await createIteration({
      userId: ctx.state.user.id,
      title: body.title,
      version: body.version,
      product: body.product,
      team: body.team,
      prepareStartDate: new Date(body.prepareStartDate),
      prepareEndDate: new Date(body.prepareEndDate),
      description: body.description
    });
    ctx.body = {
      iteration
    }
  });
}
