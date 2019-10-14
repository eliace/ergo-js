import {Html} from 'ergo-js-core'

export default class Button extends Html {

  config () {
    return {
      html: 'button',
      tabIndex: 0,
      css: 'button'
    }
  }

  options () {
    return {
      selected: {
        set: function (v) {
          this.opt('classes', {'is-selected': v})
        }
      },
      color: {
        initOrSet: function (v) {
          this.opt('classes', {['is-'+v]: true})
        }
      }
    }
  }

}
