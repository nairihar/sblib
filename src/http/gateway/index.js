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
}
