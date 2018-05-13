import { defaults, methods, } from '../configs'
import { isNotEmptyString, isRequestMethod, isObject, removeLastSlashSymbol, } from '../helpers'

const _privates = new WeakMap()
const addRoute = Symbol('addRoute')
const setPath = Symbol('setPath')
const syncRoutes = Symbol('syncRoutes')

export default class Route {
  constructor({ name, address, routes, }) {
    if (!isNotEmptyString(name)) throw 'Pleae specify correct name'
    if (!isNotEmptyString(address)) throw 'Pleae specify correct address'
    const slicedAddress = removeLastSlashSymbol(address)
    const _state = {
      name,
      address: slicedAddress,
      method: methods.POST,
      routeNames: [],
      timeout: defaults.timeout,
      messages: defaults.messages,
      headers: defaults.headers,
    }
    if (isNotEmptyString(routes)) {
      _state.routes = {}
      _state.path = routes
    } else if (isObject(routes)) {
      _state.routes = routes
      _state.path = routes.defaults || defaults.path
    } else {
      throw 'Pleae specify correct routes'
    }
    _privates.set(this, _state)
    this[addRoute]()
  }

  /* getters */
  getAddress() {
    const { address, } = _privates.get(this)
    return address
  }

  getUrl() {
    const { address, path, } = _privates.get(this)
    if (!address) return null
    const url = `${address}${path}`
    return url
  }

  getPath() {
    const { path, } = _privates.get(this)
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
  }

  setMethod(method) {
    if (!isRequestMethod(method)) throw 'Method is not valid'
    const _state = _privates.get(this)
    _state.method = method
    _privates.set(this, _state)
    this[syncRoutes]('setMethod', method)
  }

  setMessages(messages) {
    const _state = _privates.get(this)
    _state.messages = messages
    _privates.set(this, _state)
    this[syncRoutes]('setMessages', messages)
  }

  setHeaders(headers) {
    const _state = _privates.get(this)
    _state.headers = headers
    _privates.set(this, _state)
    this[syncRoutes]('setHeaders', headers)
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
        address: _state.address,
        routes: routes[routeName],
      })
    })
  }

  [syncRoutes](method, value) {
    const { routeNames, } = _privates.get(this)
    routeNames.forEach((routeName) => {
      this[routeName][method](value)
    })
  }
}
