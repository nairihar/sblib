const _privates = new WeakMap()

export default class Route {
  constructor({ name, path, method }) {
    const _state = {
      name,
      path,
      method
    }
    _privates.set(this, _state)
  }
}
