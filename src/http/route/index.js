import { defaults, methods, } from '../configs'
import { isNotEmptyString, } from '../helpers'

const _privates = new WeakMap()
const addRoute = Symbol('addRoute')
const setPath = Symbol('setPath')

export default class Route {
  constructor({ name, routes, }) {
    if (!isNotEmptyString(name)) throw 'Pleae specify correct name'
    const _state = {
      name,
      host: defaults.host,
      method: methods.POST,
      rotueNames: [],
      timeout: defaults.timeout,
      messages: defaults.messages,
    }
    if (routes instanceof String) {
      _state.routes = {}
      _state.path = routes
    } else if (routes instanceof Object) {
      _state.routes = routes
      _state.path = routes.defaults || defaults.path
    } else {
      throw 'Pleae specify correct routes'
    }
    _privates.set(this, _state)
    this[addRoute]()
  }

  /* getters */
  getHost() {
    const { host, } = _privates.get(this)
    return host
  }

  getUrl() {
    const { host, path, } = _privates.get(this)
    if (!host) return null
    const url = `${host}${path}`
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

  getInfo() {
    const name = this.getName()
    const host = this.getHost()
    const path = this.getPath()
    const method = this.getMethod()
    const timeout = this.getTimeout()
    const url = this.getUrl()
    const info = {
      name,
      host,
      path,
      method,
      timeout,
      url,
    }
    return info
  }

  /* setters */
  setTimeout(timeout) {
    const _state = _privates.get(this)
    _state.timeout = timeout
    _privates.set(this, _state)
  }

  [setPath](path) {
    const _state = _privates.get(this)
    _state.path = path
    _privates.set(this, _state)
  }

  setHost(host) {
    if (!host) throw 'Please set correct host address'

    const _state = _privates.get(this)
    let _host = host
    if (_host[_host.length - 1] === '/')
      _host = _host.slice(-1)

    _state.host = _host
    _privates.set(this, _state)
  }

  setErrorMessages(messages) {
    const _state = _privates.get(this)
    _state.messages = messages
    _privates.set(this, _state)
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
      })
    })
  }
}
