import {createTeam} from '../services/team'
import {TeamModel} from '../models/team'
import { TeamUserModel } from '../models/teamUser'

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
    return createTeam({
      title: it.title,
      description: `team${id+1}`,
      userId: user.id
    }).then(res => {
      return res
    })
  }))
}
