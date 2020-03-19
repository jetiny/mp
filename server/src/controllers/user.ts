import * as Router from 'koa-router';
import {loginUser, searchUser} from '../services/user'
import {sign} from 'jsonwebtoken'
import config from '../config';
import {auth} from '../auth'

export default function install (router: Router) {
  router.post('/user/login', async (ctx) => {
    let {username, password} = ctx.request.body
    let res : any = {
      error: 403
    }
    let user = await loginUser({
      account: username, 
      password
    })
    if (user) {
      let data : any = {
        id: user.id,
        name: user.name,
        nick: user.nick,
        ts: Date.now(),
        expirs: config.TOKEN_EXPIRES_TIME
      }
      let payload = Object.assign({
        exp: data.ts + data.expirs,
        name: user.name
      }, data)
      let token = sign(payload, config.JWT_SECRET)
      data.token = token
      ctx.body = data
    } else {
      ctx.body = res
    }
  });
  router.post('/user/logout', (ctx) => {
    ctx.session = null
    ctx.body = {}
  });
  router.post('/user/searchUser', auth, async (ctx) => {
    let users = await searchUser(ctx.request.body.name, 20)
    ctx.body = {
      users
    }
  });
}
