import {buildOpts} from './Utils'


const Options = class {

  constructor(...args) {

    this._raw = []

    for (let i = 0; i < args.length; i++) {
      this.merge(args[i])  //FIXME  потенциальная потеря производительности
    }
  }

  merge(nextOpts) {
    if (nextOpts != null) {
      if (nextOpts instanceof Options) {
        this._raw = this._raw.concat(nextOpts._raw)
      }
      else {
        this._raw.push(nextOpts)
      }
    }
    return this
  }

  mix (nextOpts) {
    return this.merge(nextOpts)
  }

  mergeBefore(prevOpts) {
    if (prevOpts != null) {
      if (prevOpts instanceof Options) {
        this.raw = prevOpts._raw.concat(this._raw)
      }
      else {
        this._raw.unshift(prevOpts)
      }
    }
    return this
  }

  build(rules) {

    // немножко эвристики для кейсов, когда опции отключаются последним сегментом
    if (this._raw[this._raw.length-1] === false) {
      return false
    }
    if (this._raw[0] === true && this._raw.length == 1) {
      return true
    }

    let o = {}

    for (let i = 0; i < this._raw.length; i++) {
      if (this._raw[i] === true) {
//        o = o || {}
        continue
      }
      else if (this._raw[i] === false) {
        continue
//        o = false
      }
      else {
        o = buildOpts(o, this._raw[i], rules || this._rules)
      }
    }

    return o
  }

  with (rules) {
    this._rules = rules
  }

}


export default Options
