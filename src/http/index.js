import { defaults } from './configs'

const _privates = new WeakMap()

export default class Http {
  constructor({ host=defaults.host, port=defaults.port, timeout=defaults.timeout}) {
    const _state = {
      host,
      port,
      timeout
    }
    _privates.set(this, _state)
  }
}
