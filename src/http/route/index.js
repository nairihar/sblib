import { defaults, methods, } from '../configs'
import { isNotEmptyString, isRequestMethod, isObject, removeLastSlashSymbol, isARoute, } from '../helpers'

const _privates = new WeakMap()
const addRoute = Symbol('addRoute')
const setPath = Symbol('setPath')
const syncRoutes = Symbol('syncRoutes')
const clearParams = Symbol('clearParams')
const parentRouteNameKey = Symbol('parentName')
const mainRoute = Symbol('mainRoute')

export default class Route {
  constructor(options) {
    const { name, address, routes, } = options
    let _state = {
      name,
      method: methods.POST,
      routeNames: [],
      timeout: defaults.timeout,
      messages: defaults.messages,
      headers: defaults.headers,
      params: [],
    }
    if (!options[parentRouteNameKey]) {
      if (!isNotEmptyString(name)) throw 'Pleae specify correct name'
      if (!isNotEmptyString(address)) throw 'Pleae specify correct address'
      const addresWithoutLastSlash = removeLastSlashSymbol(address)
      _state.address = addresWithoutLastSlash
    } else {
      _state.parentRoute = options[parentRouteNameKey]
    }

    if (isNotEmptyString(routes)) {
      _state.routes = {}
      _state.path = routes
    } else if (isObject(routes)) {
      if (isARoute(routes)) {
        _state.routes = {}
        _state.method = routes.method
        _state.path = routes.path
      } else {
        _state.routes = routes
        _state.path = routes[Route.main] || defaults.path
      }
    } else {
      throw 'Pleae specify correct routes'
    }
    _privates.set(this, _state)
    this[addRoute]()
  }

  static get main() {
    return mainRoute
  }

  /* getters */
  getAddress() {
    const { address, parentRoute, } = _privates.get(this)
    let myAddress = address
    if (!address) {
      myAddress = parentRoute.getAddress()
    }
    return myAddress
  }

  getUrl() {
    const { address, parentRoute, } = _privates.get(this)
    let myAddress = address
    if (!address) {
      myAddress = parentRoute.getUrl()
    }
    const fullPath = this.getFullPath()
    const url = `${myAddress}${fullPath}`
    return url
  }

  getPath() {
    const { path, } = _privates.get(this)
    return path
  }

  getFullPath() {
    const { path, params, } = _privates.get(this)
    const parasPath = params.join('/')
    if (parasPath) {
      this[clearParams]()
      return `${path}/${parasPath}`
    }
    return path
  }

  getName() {
    const { name, } = _privates.get(this)
    return name
  }

  getTimeout() {
    const { timeout, } = _privates.get(this)
    return timeout
  }

  getMethod() {
    const { method, } = _privates.get(this)
    return method
  }

  getMessages() {
    const { messages, } = _privates.get(this)
    return messages
  }

  getHeaders() {
    const { headers, } = _privates.get(this)
    return headers
  }

  getInfo() {
    const name = this.getName()
    const address = this.getAddress()
    const path = this.getPath()
    const method = this.getMethod()
    const timeout = this.getTimeout()
    const url = this.getUrl()
    const messages = this.getMessages()
    const headers = this.getHeaders()
    const info = {
      name,
      address,
      path,
      method,
      timeout,
      url,
      messages,
      headers,
    }
    return info
  }

  /* setters */
  setTimeout(timeout) {
    const _state = _privates.get(this)
    _state.timeout = timeout
    _privates.set(this, _state)
    this[syncRoutes]('setTimeout', timeout)
    return this
  }

  [setPath](path) {
    const _state = _privates.get(this)
    _state.path = path
    _privates.set(this, _state)
  }

  setAddress(address) {
    if (!address) throw 'Please set correct address'
    const _state = _privates.get(this)
    const _address = removeLastSlashSymbol(address)
    _state.address = _address
    _privates.set(this, _state)
    this[syncRoutes]('setAddress', address)
    return this
  }

  setMethod(method) {
    if (!isRequestMethod(method)) throw 'Method is not valid'
    const _state = _privates.get(this)
    _state.method = method
    _privates.set(this, _state)
    this[syncRoutes]('setMethod', method)
    return this
  }

  setMessages(messages) {
    const _state = _privates.get(this)
    _state.messages = messages
    _privates.set(this, _state)
    this[syncRoutes]('setMessages', messages)
    return this
  }

  setHeaders(headers) {
    const _state = _privates.get(this)
    _state.headers = headers
    _privates.set(this, _state)
    this[syncRoutes]('setHeaders', headers)
    return this
  }

  params(...params) {
    const _state = _privates.get(this)
    _state.params = params
    _privates.set(this, _state)
    return this
  }

  /* other methods */
  [addRoute]() {
    const _state = _privates.get(this)
    const { routes, } = _state
    const routeNames = Object.keys(routes)
    _state.routeNames = routeNames
    routeNames.forEach((routeName) => {
      this[routeName] = new Route({
        name: routeName,
        routes: routes[routeName],
        [parentRouteNameKey]: this,
      })
    })
  }

  [syncRoutes](method, value) {
    const { routeNames, } = _privates.get(this)
    routeNames.forEach((routeName) => {
      this[routeName][method](value)
    })
  }

  [clearParams]() {
    const _state = _privates.get(this)
    _state.params = []
    _privates.set(this, _state)
    if (_state.parentRoute) {
      _state.parentRoute[clearParams]()
    }
  }

  fetch() {
    this[clearParams]()
    // TODO :: do request
  }
}
