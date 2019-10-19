import { BaseContext, DefaultContext } from 'koa';
 
declare module 'koa' {
  interface BaseContext {
    session: any;
  }
}
