import {Html} from '../../src'

export default class Button extends Html {

  config () {
    return {
      html: 'button',
      tabIndex: 0,
      css: 'button'
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
