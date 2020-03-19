import {TeamModel} from '../models/team'
import {TeamUserModel, TeamUserRole} from '../models/teamUser'
import {ObjectID} from 'mongodb'
import { isObjectId, createId } from '../models/mongo'

/**
 * 创建团队
 */
export async function createTeam (input: {
  userId: string | ObjectID,
  title: string,
  description: string,
}) {
  let ref = new TeamModel(Object.assign(input, {
    status: 0,
    createdBy: isObjectId(input.userId) || createId(input.userId as string),
    createdAt: new Date(),
    updatedBy: isObjectId(input.userId) || createId(input.userId as string),
    updatedAt: new Date(),
  }))
  return ref.save()
}

/**
 * 用户创建团队，并把自己设为创建者
 */
export async function userCreateTeam(input: {
  userId: string | ObjectID,
  title: string,
  description: string,
}) {
  return createTeam(input).then(team => {
    return addUserToTeam({
      team: team.id,
      user: input.userId,
      userId: input.userId,
      role: TeamUserRole.Owner
    })
  })
}

/**
 * 更新Team状态值
 */
export async function updateTeamStatus (input: {
  id: string | ObjectID,
  status: number,
  userId: string | ObjectID
}) {
  let id = isObjectId(input.id) || createId(input.id as string)
  return TeamModel.findOneAndUpdate({
    _id: id
  }, {$set: {
    status: input.status,
    updatedBy: isObjectId(input.userId) || createId(input.userId as string),
    updatedAt: new Date(),
  }}, {new : true}).exec()
}

/**
 * 更新Team状态值
 */
export async function updateTeam (input: {
  id: string | ObjectID,
  userId: string | ObjectID,
  title: string,
  description: string,
}) {
  let id = isObjectId(input.id) || createId(input.id as string)
  return TeamModel.findOneAndUpdate({
    _id: id
  }, {$set: {
    title: input.title,
    description: input.description,
    updatedBy: isObjectId(input.userId) || createId(input.userId as string),
    updatedAt: new Date(),
  }}, {new : true}).exec()
}

/**
 * 将用户加入到Team中
 */
export async function addUserToTeam(input: {
  team:  string | ObjectID,
  user: string | ObjectID,
  userId: string | ObjectID,
  role: number
}) {
  let ref = new TeamUserModel(Object.assign(input, {
    status: 0,
    role: input.role,
    team: isObjectId(input.team) || createId(input.team as string),
    user: isObjectId(input.user) || createId(input.user as string),
    createdBy: isObjectId(input.userId) || createId(input.userId as string),
    createdAt: new Date(),
    updatedBy: isObjectId(input.userId) || createId(input.userId as string),
    updatedAt: new Date(),
  }))
  return ref.save()
}

/**
 * 更新用户在Team中的状态
 */
export async function updateTeamUserStatus (input: {
  id?: string | ObjectID,
  team?:  string | ObjectID,
  user?: string | ObjectID,
  status: number,
  userId: string | ObjectID
}) {
  return TeamUserModel.findOneAndUpdate(
    input.id ? {
      _id: (isObjectId(input.id) || createId(input.id as string))
    }:
    {
      team: isObjectId(input.team) || createId(input.team as string),
      user: isObjectId(input.user) || createId(input.user as string),
    },{
      status: input.status,
      updatedBy: isObjectId(input.userId) || createId(input.userId as string),
      updatedAt: new Date(),
    }).exec()
}

/**
 * 更新用户在Team中的角色
 */
export async function updateTeamUserRole (input: {
  id?: string | ObjectID,
  team?:  string | ObjectID,
  user?: string | ObjectID,
  role: number,
  userId: string | ObjectID
}) {
  return TeamUserModel.findOneAndUpdate(
    input.id ? {
      _id: (isObjectId(input.id) || createId(input.id as string))
    }:
    {
      team: isObjectId(input.team) || createId(input.team as string),
      user: isObjectId(input.user) || createId(input.user as string),
    },{
      role: input.role,
      updatedBy: isObjectId(input.userId) || createId(input.userId as string),
      updatedAt: new Date(),
    }).exec()
}

/**
 * 获取用户的Team
 */
export async function getUserTeams(input: {
  user: string | ObjectID,
}) {
  let res = await TeamUserModel.find({
    role: {
      $ne: TeamUserRole.Leaved
    },
    status: 0,
    user: isObjectId(input.user) || createId(input.user as string),
  }).populate([
    {path: 'team'},
  ]).exec()
  return res.filter(it => it.team.status === 0)
}

/**
 * 获取Team的用户
 */
export async function getTeamUsers(input: {
  team: string | ObjectID
}) {
  return TeamUserModel.find({
    team: isObjectId(input.team) || createId(input.team as string),
  }).populate([
    {path: 'user', select : 'name nick id'},
  ]).exec()
}

/**
 * 获取用户在Team中的角色
 */
export async function getUserTeamRole(input: {
  team: string | ObjectID,
  user: string | ObjectID,
}) {
  return TeamUserModel.findOne({
    status: 0,
    user: isObjectId(input.user) || createId(input.user as string),
    team: isObjectId(input.team) || createId(input.team as string),
  }).exec()
}
