import * as Router from 'koa-router';
import {auth} from '../auth'
import {getUserTeams, userCreateTeam, getTeamUsers, addUserToTeam, getUserTeamRole, updateTeamUserRole, updateTeam} from '../services/team'
import { TeamUserRole } from '../models/teamUser';
import {deleteTeam} from '../services/common'
import { createProduct, getTeamsProducts, addUserToProduct } from '../services/product';
import { ProductUserRole } from '../models/productUser';

export default function install (router: Router) {
  router.post('/team/listTeam', auth,  async (ctx) => {
    let teams = await getUserTeams({
      user: ctx.state.user.id
    });
    ctx.body = {
      teams
    }
  });
  /**
   * 获取用户的团队列表
   */
  router.post('/team/listUserTeams', auth,  async (ctx) => {
    let teams = await getUserTeams({
      user: ctx.state.user.id
    });
    teams = teams.map(it => {
      return {
        id: it.team.id,
        title: it.team.title,
        updatedAt: it.team.updatedAt,
        createdAt: it.team.createdAt,
      }
    })
    ctx.body = {
      teams
    }
  });
  
  /**
   * 创建Team
   */
  router.post('/team/createTeam', auth,  async (ctx) => {
    let body = ctx.request.body
    let team = await userCreateTeam({
      userId: ctx.state.user.id,
      title: body.title,
      description: body.description
    });
    ctx.body = {
      team
    }
  });
 
  /**
   * 编辑Team
   */
  router.post('/team/updateTeam', auth,  async (ctx) => {
    let body = ctx.request.body
    let team = await updateTeam({
      id: body.id,
      userId: ctx.state.user.id,
      title: body.title,
      description: body.description
    });
    ctx.body = {
      team
    }
  });
  /**
   * 创建Product
   */
  router.post('/team/createProduct', auth,  async (ctx) => {
    let body = ctx.request.body
    let product = await createProduct({
      userId: ctx.state.user.id,
      title: body.title,
      team: body.team,
      description: body.description
    });
    let user = await addUserToProduct({
      product: product.id,
      team: body.team,
      userId: ctx.state.user.id,
      user: ctx.state.user.id,
      role: ProductUserRole.Owner,
    })
    ctx.body = {
      product,
      user
    }
  });
  /**
   * 获取Team的产品列表
   */
  router.post('/team/listTeamProducts', auth,  async (ctx) => {
    let body = ctx.request.body
    let products = await getTeamsProducts({
      teams: [body.team],
    });
    ctx.body = {
      products
    }
  });
  /**
   * 获取用户的团队列表
   */
  router.post('/team/listTeamUsers', auth,  async (ctx) => {
    let users = await getTeamUsers({
      team: ctx.request.body.team
    });
    ctx.body = {
      users
    }
  });
  /**
   * 团队添加用户
   */
  router.post('/team/addTeamUser', auth,  async (ctx) => {
    let {team, user, role} = ctx.request.body
    let userTeam = await getUserTeamRole({
      team,
      user: ctx.state.user.id
    })
    if (!userTeam) {
      throw new Error('Team not found')
    }
    if (!(userTeam.role === TeamUserRole.Master || (userTeam.role === TeamUserRole.Owner))) {
      throw new Error('unauthorized operation')
    }
    if ((role === TeamUserRole.Owner) && (userTeam.role !== TeamUserRole.Owner)) {
      throw new Error('unauthorized operation')
    }
    let teamUser = await addUserToTeam({
      team,
      user,
      role,
      userId: ctx.state.user.id,
    });
    ctx.body = {
      user: teamUser
    }
  });
  /**
   * 团队更新用户状态
   */
  router.post('/team/changeTeamUserRole', auth,  async (ctx) => {
    let {team, user, role} = ctx.request.body
    let userTeam = await getUserTeamRole({
      team,
      user: ctx.state.user.id
    })
    if (!userTeam) {
      throw new Error('Team not found')
    }
    if (!(userTeam.role === TeamUserRole.Master || (userTeam.role === TeamUserRole.Owner))) {
      throw new Error('unauthorized operation')
    }
    if ((role === TeamUserRole.Owner) && (userTeam.role !== TeamUserRole.Owner)) {
      throw new Error('unauthorized operation')
    }
    let teamUser = await updateTeamUserRole({
      team,
      user,
      role,
      userId: ctx.state.user.id,
    });
    ctx.body = {
      user: teamUser
    }
  });
  /**
   * 删除团队
   */
  router.post('/team/deleteTeam', auth,  async (ctx) => {
    let {team} = ctx.request.body
    let userTeam = await getUserTeamRole({
      team,
      user: ctx.state.user.id
    })
    if (!userTeam) {
      throw new Error('Team not found')
    }
    if (!(userTeam.role === TeamUserRole.Owner)) {
      throw new Error('unauthorized operation')
    }
    let {tm} = await deleteTeam({
      id: team,
      status: 1,
      userId: ctx.state.user.id
    })
    ctx.body = {
      team: tm
    }
  });
}
