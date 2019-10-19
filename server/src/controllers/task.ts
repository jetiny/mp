import * as Router from 'koa-router';
import {auth} from '../auth'

export default function install (router: Router) {
  router.get('/projects', auth,  (ctx) => {
    console.log(ctx.request.body)
    ctx.body = {a: 1}
  });
}
