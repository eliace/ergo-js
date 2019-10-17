import {Html} from 'ergo-js-core'
import IconBox from './IconBox'

export default class Button extends Html {

  config () {
    return {
      html: 'button',
      tabIndex: 0,
      css: 'button',
      $icon: {
        as: IconBox
      },
      $content: {
        html: 'span',
        renderIfEmpty: false
      },
      components: {
        icon: false,
        content: false
      }
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
      },
      icon: {
        initOrSet: function (v) {
          this.opt('components', {icon: v, content: !!v})
        }
      }
    }
  }

}
