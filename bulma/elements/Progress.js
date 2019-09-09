import {Html} from '../../src'

export default class Progress extends Html {

  config () {
    return {
      html: 'progress',
      css: 'progress',
      max: 100
    }
  }

  configOptions () {
    return {
      max: {
        initOrSet: function (v) {
          this.props['max'] = v
        }
      }
    }
  }

}
