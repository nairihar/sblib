const _privates = new WeakMap()

export default class Route {
  constructor({ name, path, method, gateway, }) {
    const _state = {
      info: {
        name,
        path,
        method,
      },
      gateway,
    }
    _privates.set(this, _state)
  }

  /* getters */
  getRequestOptions() {
    const { gateway, info, } = _privates.get(this)
    const gatewayPath = gateway.getInfo().path
    // TODO :: fix url, add host and port
    const requestOptions = {
      url: `${gatewayPath}${info.path}`,
      method: info.method,
    }
    return requestOptions
  }

  getInfo() {
    const { info, } = _privates.get(this)
    const requestOptions = this.getRequestOptions()
    return {
      ...info,
      ...requestOptions,
    }
  }

  getName() {
    const { name, } = this.getInfo()
    return name
  }

  getPath() {
    const { path, } = this.getInfo()
    return path
  }

  getMethod() {
    const { method, } = this.getInfo()
    return method
  }
}
