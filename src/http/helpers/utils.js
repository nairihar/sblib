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

export const removeLastSlashSymbol = (string) => {
  if (string[string.length - 1] === '/')
    return string.slice(0, -1)
  return string
}

export const isSymbol = (value) => {
  if (typeof value === 'symbol') {
    return true
  }
  return false
}

export const isARoute = (route) => {
  if ('path' in route && 'method' in route && isSymbol(route.method)) {
    return true
  }
  return false
}
