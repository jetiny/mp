import {createTeam, addUserToTeam} from '../services/team'
import {TeamModel} from '../models/team'
import { TeamUserModel, TeamUserRole } from '../models/teamUser'
import { getObjectId } from './util'

export function emptyTeam() {
  return TeamModel.deleteMany({})
}

export function emptyTeamUser() {
  return TeamUserModel.deleteMany({})
}

export async function ensureSomeTeam(user: any) {
  return Promise.all([
    { title: '团队1组'},
    { title: '团队2组'},
    { title: '团队3组'},
  ].map((it, id) => {
    return createTeam(Object.assign({
      _id: getObjectId(),
      title: it.title,
      description: `team${id+1}`,
      userId: user.id
    })).then(async (res) => {
      await addUserToTeam({
        team: res.id,
        userId: user.id,
        user: user.id,
        role: TeamUserRole.Owner
      })
      return res
    })
  }))
}
