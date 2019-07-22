import {Html} from '../core'

export default class Button extends Html {

  config () {
    return {
      html: 'button',
      tabIndex: 0,
      as: 'button'
    }
  }

  configOptions () {
    return {
      selected: {
        set: function (v) {
          this.opt('classes', {'is-selected': v})
        }
      }
    }
  }

}
