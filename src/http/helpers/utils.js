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

export const isNotEmptyString = (value) => {
  if (typeof value !== 'string' || !value.trim()) return false
  return true
}

export const isObject = (value) => {
  return (value instanceof Object)
}
