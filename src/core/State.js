import {deepClone} from './Utils'


class State {

  constructor(...args) {

    this._raw =


    this.state = v
    this.observers = []
    this.options = options
  }

  get() {
    return this.compute(this.state)
  }

  set(name) {
    this.state[name] = true
    this.update()
  }

  unset(name) {
    this.state[name] = false
    this.update()
  }

  is(name) {
    return this.state[name]
  }

  toggle(name) {
    this.state[name] ? this.unset(name) : this.set(name)
  }

  join(target, stateChanged) {
    this.observers.push({target, stateChanged})
  }

  update() {
    const computedState = this.compute(this.state)
    console.log('change', this.state, computedState)
    this.observers.forEach(t => t.stateChanged.call(t.target, computedState))
  }

  compute(s) {
    return this.parent ? {...this.parent.state, ...this.state} : this.state
  }

}


export default State
