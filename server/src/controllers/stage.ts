import * as Router from 'koa-router';
import {auth} from '../auth'
import {listStages, listIterationsStages} from '../services/stage'

export default function install (router: Router) {
  router.post('/stage/listStages', auth,  async (ctx) => {
    ctx.body = {
      stages: await listStages()
    }
  });
  router.post('/stage/listIterationsStages', auth,  async (ctx) => {
    ctx.body = {
      stages: await listIterationsStages({
        iteration: ctx.request.body.iterations,
      })
    }
  });
}
