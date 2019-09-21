import Effect from './Effect'

class EffectorFunc extends Function {
  constructor (name='', eff={}) {
    const f = function (...params) {
      return f._effData.use.apply(this, params)
//      console.log('f', f._effData, params)
    }
    Object.setPrototypeOf(f, new.target.prototype)
    f._effName = name
    f._effData = eff
    return f
  }

  use (fn) {
    return new EffectorFunc(this._effName, {...this._effData, use: fn})
  }

  watch (event, callback) {
    const watchers = (this._effData.watchers || []).splice(0)
    watchers.push({event, callback})
    return new EffectorFunc(this._effName, {...this._effData, watchers})
  }

  get ready () {
    return '@'+this._effName
  }

  get done () {
    return '@'+this._effName+':done'
  }

  get fail () {
    return '@'+this._effName+':fail'
  }

  get finals () {
    return {['@'+this._effName+':done']: true}
  }

}
