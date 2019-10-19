import * as Router from 'koa-router';
import {loginUser} from '../services/user'

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
      let data = {
        id: user.id,
        name: user.name,
        nick: user.nick
      }
      ctx.body = data
      ctx.session = data
    } else {
      ctx.session = null
      ctx.body = res
    }
  });
  router.post('/user/logout', (ctx) => {
    ctx.session = null
    ctx.body = {}
  });
}
