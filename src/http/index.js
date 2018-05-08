import Route from './route'

const _privates = new WeakMap()

export default class HttpRoute extends Route {
  constructor(options) {
    super(options)

    const _state = {
      info: {
        name: options.name,
        host: options.host,
      },
    }
    _privates.set(this, _state)
  }

  /* getters */
  getHost() {
    const { host, } = this.getInfo()
    return host
  }

  /* other methods */
  addRoute(options) {
    options.url = this.getUrl()
    const route = super.addRoute(options)
    this[options.name] = route
    return route
  }
}
