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
    const { info } = _privates.get(this)
    return info
  }

  getName() {
    const { name } = this.getInfo()
    return name
  }

  getVersion() {
    const { version } = this.getInfo()
    return version
  }
}
