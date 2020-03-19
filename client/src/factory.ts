import { v0, ContractServiceContext, ActionServiceContext } from "savml";

export const factory = v0();
import MyContract from "../com.mp.contract";

factory.add(new MyContract());

factory.on("contract.prepare", (ctx: ContractServiceContext) => {
  Object.assign(ctx.routerOptions, {
    prefix: `//localhost:3000`
  });
});

let token = "";

export function setToken(userToken: string) {
  token = userToken;
}

factory.on("action.prepare", ([ctx, service]: [ActionServiceContext, any]) => {
  ctx.checkRequest = false;
  ctx.checkResponse = false;
  let Authorization = token ? `Bearer ${token}` : "";
  let headers = new Headers({
    ...ctx.headers,
    Authorization
  });
  ctx.fetch = () =>
    fetch(ctx.url, {
      method: ctx.method,
      headers,
      body: JSON.stringify(ctx.requestData)
    })
      .then(res => res.json())
      .then(res => {
        return {
          json: () => res
        };
      });
});

export function install(Vue: any) {
  return factory.service("com.mp.contract").then(cc => {
    Vue.prototype.$api = cc.service();
  });
}
