import { methods, } from '../configs'

export const isRequestMethod = (method) => {
  let isMethod = false
  Object.keys(methods).forEach(methodName => {
    if (method === methods[methodName]) {
      isMethod = true
    }
  })
  return isMethod
}
