import {ensuerSomeUser, emptyUsers, ensureUnusedUsers} from './user'
import { emptyTeam, ensureSomeTeam, emptyTeamUser } from './team'
import { addUserToTeam, updateTeamUserStatus, updateTeamUserRole } from '../services/team';
import { TeamUserRole } from '../models/teamUser';
import { emptyProduct, emptyProductUser, ensureSomeProduct } from './product';
import { addUserToProduct, updateProductUserStatus, updateProductUserRole } from '../services/product';
import { ProductUserRole } from '../models/productUser';
import { emptyIteration, ensureSomeIteration } from './iteration';
import { emptyStages, ensuerSomeStages } from './stage';
import {emptyTasks} from './task'

export default async function () {
  await emptyTeam();
  await emptyUsers();
  await emptyTeamUser();
  await emptyProduct();
  await emptyProductUser();
  await emptyIteration();
  await ensureUnusedUsers();
  await emptyStages();
  await emptyTasks();
  let stages = await ensuerSomeStages();
  
  let users = await ensuerSomeUser();
  let currentUser = users[0]
  let teams = await ensureSomeTeam(currentUser);
  let currentTeam = teams[0]
  let products = await ensureSomeProduct(currentUser, currentTeam)
  let currentProduct = products[0]
  let teamUserDatas = await Promise.all(users.map( async (it, id) => {
    if (id > 0) {
      await Promise.all([
        addUserToTeam({ // 添加用户到团队
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
        }),
        addUserToProduct({ // 添加用户到产品
          product: currentProduct.id,
          team: currentTeam.id,
          user: it.id,
          role: 0,
          userId: currentUser.id
        }).then(res => {
          return updateProductUserStatus(id % 2 ? { // 更新状态
            id: res.id,
            userId: currentUser.id,
            status: 1,
          }: {
            product: currentProduct.id,
            user: it.id,
            userId: currentUser.id,
            status: 1,
          }).then(data => {
            return updateProductUserRole(id % 2 ? { // 更新角色
              id: res.id,
              userId: currentUser.id,
              role: ProductUserRole.Master,
            }: {
              product: currentProduct.id,
              user: it.id,
              userId: currentUser.id,
              role: ProductUserRole.Master,
            })     
          })
        }),
      ]);
    }
  }))
  products.map(async (product) => {
    await ensureSomeIteration(product, currentUser.id, stages)
  })
}
