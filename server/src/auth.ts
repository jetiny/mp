import * as Router from 'koa-router';

export const auth = async (ctx , next) => {
  if (ctx.session.uid) {
    await next()
  } else {
    ctx.body = {
      error: 403
    }
  }
}
