import * as Router from 'koa-router';
import {auth} from '../auth'
import {createTask, listTasks, updateTask, updateTaskStatus} from '../services/task'
import { TaskStatus } from '../models/task';

export default function install (router: Router) {
  router.post('/task/listTasks', auth,  async (ctx) => {
    let input = ctx.request.body
    if (input.assignedMe) {
      input.assignUser = ctx.state.user.id
    }
    if (input.createdByMe) {
      input.createdBy = ctx.state.user.id
    }
    let tasks = await listTasks(input)
    ctx.body = {
      tasks
    }
  });

  router.post('/task/createTask', auth,  async (ctx) => {
    let input = ctx.request.body
    let task = await createTask({
      userId: ctx.state.user.id,
      title: input.title,
      content: input.content,
      taskStatus: input.taskStatus,
      assignUser: input.assignUser || null,
      prepareStartDate: input.prepareStartDate,
      prepareEndDate: input.prepareEndDate,
      realStartDate: input.realStartDate || null,
      realEndDate: input.realEndDate || null,
      product: input.product,
      team: input.team,
      iteration: input.iteration,
      iterationStage: input.iterationStage,
      estimateHours: input.estimateHours,
    });
    ctx.body = {
      task
    }
  });

  router.post('/task/updateTask', auth,  async (ctx) => {
    let input = ctx.request.body
    let task = await updateTask(Object.assign(input, {
      userId: ctx.state.user.id,
    }));
    ctx.body = {
      task
    }
  });

  router.post('/task/startTask', auth,  async (ctx) => {
    let input = ctx.request.body
    let task = await updateTask(Object.assign({
      id: input.id,
      userId: ctx.state.user.id,
      realStartDate: new Date(),
      taskStatus: TaskStatus.Doing,
    }));
    ctx.body = {
      task
    }
  });

  router.post('/task/stopTask', auth,  async (ctx) => {
    let input = ctx.request.body
    let task = await updateTask(Object.assign({
      id: input.id,
      userId: ctx.state.user.id,
      realEndDate: new Date(),
      taskStatus: TaskStatus.Done,
    }));
    ctx.body = {
      task
    }
  });

  router.post('/task/deleteTask', auth,  async (ctx) => {
    let input = ctx.request.body
    let task = await updateTaskStatus(Object.assign({
      id: input.id,
      userId: ctx.state.user.id,
      status: 1,
    }));
    ctx.body = {
      task
    }
  });
}
