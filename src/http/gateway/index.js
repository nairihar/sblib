import Route from '../route'

const _privates = new WeakMap()

export default class Gateway {
  constructor({ name, path }) {
    const _state = {
      info: {
        name,
        path
      },
      routes: {}
    }
    _privates.set(this, _state)
  }

  /* getters */
  getInfo() {
    const { info } = _privates.get(this)
    return info
  }

  getName() {
    const { name } = this.getInfo()
    return name
  }

  getPath() {
    const { path } = this.getInfo()
    return path
  }

  getAllRouteNames() {
    const { routes } = _privates.get(this)
    return Object.keys(routes)
  }

  getRoute(name) {
    const { routes } = _privates.get(this)
    return routes[name]
  }

  getAllRoutes() {
    const { routes } = _privates.get(this)
    return routes
  }

  /* other methods */
  addRoute({ name, path }) {
    const _state = _privates.get(this)
    const newRoute = new Route({
      name,
      path
    })
    _state.routes[name] = newRoute
    _privates.set(this, _state)
    return _state.routes[name]
  }
}
