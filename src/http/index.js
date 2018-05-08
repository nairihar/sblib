import Gateway from './Gateway'
import { defaults, methods } from './configs'

const _privates = new WeakMap()

export default class Http {
  constructor({ host=defaults.host, port=defaults.port, timeout=defaults.timeout}) {
    this.methods = methods

    const _state = {
      info: {
        host,
        port,
        timeout,
      },
      gateways: {}
    }
    _privates.set(this, _state)
  }

  /* getters */
  getInfo() {
    const { info } = _privates.get(this)
    return info
  }

  getHost() {
    const { host } = this.getInfo()
    return host
  }

  getPort() {
    const { port } = this.getInfo()
    return port
  }

  getAllGatewayNames() {
    const { gateways } = _privates.get(this)
    return Object.keys(gateways)
  }

  getGateway(name) {
    const { gateways } = _privates.get(this)
    return gateways[name] || null
  }

  getAllGateways() {
    const { gateways } = _privates.get(this)
    return gateways
  }

  /* other methods */
  addGateway({ name, path }) {
    const _state = _privates.get(this)
    const newGateway = new Gateway({
      name,
      path
    })
    _state.gateways[name] = newGateway
    _privates.set(this, _state)
    return _state.gateways[name]
  }
}
