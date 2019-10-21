import {Html} from 'ergo-js-core'

export default class Progress extends Html {

  config () {
    return {
      html: 'progress',
      css: 'progress',
      max: 100
    }
  }

  properties () {
    return {
      max: {
        set: function (v) {
          this.props['max'] = v
        }
      }
    }
  }

}
