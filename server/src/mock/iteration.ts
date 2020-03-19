import {createIteration, updateIteration} from '../services/iteration'
import {IterationModel} from '../models/iteration'
import {ObjectID} from 'mongodb'
import { insertIterationStage } from '../services/stage'
import { getObjectId } from './util'

export function emptyIteration() {
  return IterationModel.deleteMany({})
}

export async function ensureSomeIteration(product: any, userId: string | ObjectID, stages: any[]) {
  return Promise.all([
    { title: '迭代1'},
    { title: '迭代2'},
    { title: '迭代3'},
  ].map((it, id) => {
    return createIteration(Object.assign({
      _id: getObjectId(),
      product: product.id,
      team: product.team,
      title: it.title,
      version: `version-${id+1}`,
      description: `version${id+1}`,
      userId,
      prepareStartDate: new Date(),
      prepareEndDate: new Date(+new Date() + 1000 * 3600 * 24 * 10)
    })).then(async (res) => {
      let first = res
      let stageObjects = await Promise.all(stages.map(it => insertIterationStage(Object.assign({
        iteration: first.id,
        stage: it.id,
        prepareStartDate: new Date(),
        prepareEndDate: new Date(),
        userId,
      }, it.toObject()))));
      await updateIteration({
        id: first.id,
        stages: stageObjects.map((res: any) => res.id),
        userId,
      });
      return res
    })
  }))
}
