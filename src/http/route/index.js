import { defaults, methods, } from './configs'

const _privates = new WeakMap()

export default class Route {
  methods = methods

  constructor({ name, url, path=defaults.path, method=methods.POST, }) {
    const _state = {
      info: {
        name,
        url: `${url}${path}`,
        path,
        method,
      },
      timeout: defaults.timeout,
      messages: {},
      routes: {},
    }
    _privates.set(this, _state)
  }

  /* getters */
  getInfo() {
    const { info, } = _privates.get(this)
    return info
  }

  getUrl() {
    const { url, } = this.getInfo()
    return url
  }

  getPath() {
    const { path, } = this.getInfo()
    return path
  }

  getName() {
    const { name, } = this.getInfo()
    return name
  }

  getTimeout() {
    const { timeout, } = _privates.get(this)
    return timeout
  }

  getMethod() {
    const { method, } = this.getInfo()
    return method
  }

  /* setters */
  setTimeout(timeout) {
    if (!(timeout > 0)) {
      throw 'Please enter a valid timeout value'
    }
    const _state = _privates.get(this)
    const _newState = {
      ..._state,
      timeout,
    }
    _privates.set(this, _newState)
  }

  setErrorMessages(messages) {
    const _state = _privates.get(this)
    const _newState = {
      ..._state,
      messages,
    }
    _privates.set(this, _newState)
  }

  /* other methods */
  addRoute(options) {
    if (!options.name) throw 'Please specify route name.'
    const _state = _privates.get(this)
    const newRoute = new Route(options)
    _state.routes[options.name] = newRoute
    _privates.set(this, _state)
    return _state.routes[options.name]
  }
}
