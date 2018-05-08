import Route from '../route'

const _privates = new WeakMap()

export default class Gateway {
  constructor({ name, path }) {
    const _state = {
      name,
      path,
      routes: {}
    }
    _privates.set(this, _state)
  }

  /* getters */
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
