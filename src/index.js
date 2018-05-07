import Http from './http'

const _privates = new WeakMap()

export default class BSDK {
  constructor({ name='', version='' }) {
    const _state = {
      info: {
        name,
        version
      }
    }
    _privates.set(this, _state)
  }


  /* getters */
  getInfo() {
    const _state = _privates.get(this)
    return _state.info
  }

  getName() {
    const { name } = this.getInfo()
    return name
  }

  getVersion() {
    const { version } = this.getInfo()
    return version
  }

  /* other methods */
  initHttp(options) {
    this.http = new Http(options)
  }
}
