import {createTask} from '../services/task'
import {TaskModel} from '../models/task'
import { getObjectId } from './util'
import { ObjectID } from 'mongodb'

export function emptyTasks() {
  return TaskModel.deleteMany({})
}

export function ensuerSomeTasks(input:{
  product: string | ObjectID,
  team: string | ObjectID,
  iteration: string | ObjectID,
  iterationStage?: string | ObjectID,
  userId: string | ObjectID
}) {
  return Promise.all([
    { title: '任务'},
    { title: '任务'},
    { title: '任务'},
  ].map((it, id) => {
    return createTask(Object.assign({
      _id: getObjectId(),
      content: `content of ${it.title}`,
      title: `${it.title}-${id}`,
      assignUser: input.userId,
      taskStatus: id % 4
    }))
  }))
}
