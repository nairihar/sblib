import Gateway from './Gateway'
import { defaults } from './configs'

const _privates = new WeakMap()

export default class Http {
  constructor({ host=defaults.host, port=defaults.port, timeout=defaults.timeout}) {
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
}
