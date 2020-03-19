import config from './config'
import * as jwt from 'koa-jwt'

export const auth = jwt({secret: config.JWT_SECRET})
