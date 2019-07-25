import {Html} from '../src'
import {Layouts, Button, Buttons, IconBox} from '../bulma'


export class ButtonWithIcon extends Button {

  config () {
    return {
      $icon: {
        type: IconBox,
        as: 'is-small',
      },
      $content: {
        html: 'span',
        renderIfEmpty: false
      }
    }
  }

  configOptions () {
    return {
      icon: {
        initOrSet: function (v) {
          this.$icon.opt('icon', v)
        }
      }
    }
  }

}
