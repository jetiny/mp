import {v0, ContractServiceContext, ActionServiceContext} from 'savml'

export const factory = v0()
import MyContract from '../com.mp.contract'

factory.add(new MyContract())

factory.on('contract.prepare', (ctx: ContractServiceContext) => {
  Object.assign(ctx.routerOptions, {
    prefix: `//localhost:3000`
  })
});

factory.on('action.prepare', ([ctx, service]: [ActionServiceContext, any]) => {
  ctx.checkRequest = false
  ctx.checkResponse = false
  const headers = new Headers({
    ...ctx.headers,
  })
  ctx.fetch = () => fetch(ctx.url, {
    method: ctx.method,
    headers,
    body: JSON.stringify(ctx.requestData)
  }).then((res) => res.json())
  .then((res) => {
    return {
      json: () => res.data
    }
  })
})

export function install(Vue: any) {
  return factory.service('com.mp.contract').then((cc) => {
    Vue.prototype.$api = cc.service()
  })
}
