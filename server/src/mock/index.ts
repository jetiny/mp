import {ensuerSomeUser, emptyUsers} from './user'
import { emptyTeam, ensureSomeTeam, emptyTeamUser } from './team'
import { addUserToTeam, updateTeamUserStatus, updateTeamUserRole } from '../services/team';
import { TeamUserRole } from '../models/teamUser';

export default async function () {
  await emptyTeam();
  await emptyUsers();
  await emptyTeamUser();
  
  let users = await ensuerSomeUser();
  let currentUser = users[0]
  let teams = await ensureSomeTeam(currentUser);
  let currentTeam = teams[0]
  let teamUserDatas = await Promise.all(users.map((it, id) => {
    if (id > 0) {
      return addUserToTeam({ // 添加用户到团队
        team: currentTeam.id,
        user: it.id,
        role: 0,
        userId: currentUser.id
      }).then(res => {
        return updateTeamUserStatus(id % 2 ? { // 更新状态
          id: res.id,
          userId: currentUser.id,
          status: 1,
        }: {
          team: currentTeam.id,
          user: it.id,
          userId: currentUser.id,
          status: 1,
        }).then(data => {
          return updateTeamUserRole(id % 2 ? { // 更新角色
            id: res.id,
            userId: currentUser.id,
            role: TeamUserRole.Leaved,
          }: {
            team: currentTeam.id,
            user: it.id,
            userId: currentUser.id,
            role: TeamUserRole.Master,
          })     
        })
      })
    }
  }))
  console.log(teamUserDatas)
}
