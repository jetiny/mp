import * as Router from 'koa-router';
import {auth} from '../auth'
import {listProductIterations, updateIteration, updateIterationStatus} from '../services/iteration'
import { ProductUserRole } from '../models/productUser';
import { ensureUserProductRole } from '../services/product';
import { insertIterationStage } from '../services/stage';

export default function install (router: Router) {
  router.post('/iteration/listProductIterations', auth, async (ctx) => {
    let iterations = await listProductIterations({
      product: ctx.request.body.product
    })
    ctx.body = {
      iterations
    }
  });
  /**
   * 编辑iteration
   */
  router.post('/iteration/updateIteration', auth,  async (ctx) => {
    let body = ctx.request.body

    //@TODO product和iteraction关系判断
    await ensureUserProductRole({
      product: body.product,
      user: ctx.state.user.id,
    }, [ProductUserRole.Master, ProductUserRole.Owner])

    let iteration = await updateIteration({
      id: body.id,
      userId: ctx.state.user.id,
      title: body.title,
      description: body.description,
      prepareStartDate: body.prepareStartDate,
      prepareEndDate: body.prepareEndDate,
      realStartDate: body.realStartDate,
      realEndDate: body.realEndDate,
    });
    ctx.body = {
      iteration
    }
  });
  /**
   * 删除iteration
   */
  router.post('/iteration/deleteIteration', auth,  async (ctx) => {
    let body = ctx.request.body

    //@TODO product和iteraction关系判断
    await ensureUserProductRole({
      product: body.product,
      user: ctx.state.user.id,
    }, [ProductUserRole.Master, ProductUserRole.Owner])

    let iteration = await updateIterationStatus({
      id: body.id,
      status: 1,
      userId: ctx.state.user.id,
    });
    ctx.body = {
      iteration
    }
  });
  /**
   * start iteration
   */
  router.post('/iteration/startIteration', auth,  async (ctx) => {
    let body = ctx.request.body

    //@TODO product和iteraction关系判断
    await ensureUserProductRole({
      product: body.product,
      user: ctx.state.user.id,
    }, [ProductUserRole.Master, ProductUserRole.Owner])

    let iteration = await updateIteration({
      id: body.id,
      realStartDate: new Date(),
      userId: ctx.state.user.id,
    });
    ctx.body = {
      iteration
    }
  });
  /**
   * stop iteration
   */
  router.post('/iteration/stopIteration', auth,  async (ctx) => {
    let body = ctx.request.body

    //@TODO product和iteraction关系判断
    await ensureUserProductRole({
      product: body.product,
      user: ctx.state.user.id,
    }, [ProductUserRole.Master, ProductUserRole.Owner])

    let iteration = await updateIteration({
      id: body.id,
      realEndDate: new Date(),
      userId: ctx.state.user.id,
    });
    ctx.body = {
      iteration
    }
  });
  /**
   * 编辑iteration
   */
  router.post('/iteration/updateIterationStages', auth,  async (ctx) => {
    let body = ctx.request.body

    //@TODO product和iteraction关系判断
    await ensureUserProductRole({
      product: body.product,
      user: ctx.state.user.id,
    }, [ProductUserRole.Master, ProductUserRole.Owner])
    let stageObjects = await Promise.all(body.stages.map(it => insertIterationStage(Object.assign({
      iteration: body.iteration,
      userId: ctx.state.user.id,
    }, it))));
    let stages = stageObjects.map((res: any) => res.id)
    let iteration = await updateIteration({
      id: body.iteration,
      stages: stages as any,
      userId: ctx.state.user.id,
    });

    ctx.body = {
      iteration,
      stages: stageObjects
    }
  });
}
