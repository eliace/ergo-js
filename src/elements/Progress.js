import {Html} from '../core'

export default class Progress extends Html {

  static defaultOpts = {
    html: 'progress',
    as: 'progress',
    max: 100
  }

  static OPTIONS = {
    max: {
      initOrSet: function (v) {
        this.props['max'] = v
      }
    }
  }

}
