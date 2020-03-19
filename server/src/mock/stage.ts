import {insertStage} from '../services/stage'
import {StageModel} from '../models/stage'
import { getObjectId } from './util'

export function emptyStages() {
  return StageModel.deleteMany({})
}

export function ensuerSomeStages() {
  return Promise.all([
    { title: '产品设计'},
    { title: '产品原型'},
    { title: '接口设计'},
    { title: '前端开发'},
    { title: '后端开发'},
    { title: '联合调试'},
    { title: '测试验收'},
    { title: '产品验收'},
    { title: '部署上线'},
  ].map((it, id) => {
    return insertStage(Object.assign({
      _id: getObjectId(),
      description: `description of ${it.title}`,
      title: it.title,
      code: it.title,
      color: randColor(),
    }))
  }))
}

function randColor() {
  let color = '#';
  for (let i = 0; i < 3; i++) {
    let tmp = parseInt(String(Math.random() * 255))
    color += tmp.toString(16);
  }
  return color;
}
