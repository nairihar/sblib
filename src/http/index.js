import Gateway from './Gateway'
import { defaults, methods } from './configs'

const _privates = new WeakMap()

export default class Http {
  constructor({ host=defaults.host, port=defaults.port, timeout=defaults.timeout}) {
    this.methods = methods

    const _state = {
      host,
      port,
      timeout,
      gateways: {}
    }
    _privates.set(this, _state)
  }

  /* getters */
  getAllGatewayNames() {
    const { gateways } = _privates.get(this)
    return Object.keys(gateways)
  }

  getGateway(name) {
    const { gateways } = _privates.get(this)
    return gateways[name]
  }

  getAllGateway() {
    const { gateways } = _privates.get(this)
    return gateways
  }

  /* setters */
  setNewGateway({ name, path }) {
    const _state = _privates.get(this)
    const newGateway = new Gateway({
      name,
      path
    })
    _state.gateways[name] = newGateway
    _privates.set(this, _state)
    return _state.gateways[name]
  }

  /* other methods */
  deleteGateway(name) {
    const _state = _privates.get(this)
    _state.gateways[name] = null
  }
}
