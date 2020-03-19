import { createId } from '../models/mongo'

let id = 0;

export function getObjectId() {
  return createId(`5dc240299cc69a6e${10000000 + id++}`)
}
