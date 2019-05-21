import {buildOpts} from './Utils'


const Options = class {

  constructor(...args) {

    this._raw = []

    for (let i = 0; i < args.length; i++) {
      this.merge(args[i])  //FIXME  потенциальная потеря производительности
    }
  }

  merge(nextOpts) {
    if (nextOpts) {
      if (nextOpts instanceof Options) {
        this._raw = this._raw.concat(nextOpts._raw)
      }
      else {
        this._raw.push(nextOpts)
      }
    }
    return this
  }

  build(rules) {

    let o = {}

    for (let i = 0; i < this._raw.length; i++) {
      o = buildOpts(o, this._raw[i], rules || this._rules)
    }

    return o
  }

  with(rules) {
    this._rules = rules
  }


}


export default Options
