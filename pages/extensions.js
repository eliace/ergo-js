import {Html, Layouts, Button, Buttons, IconBox} from '../src'


export class ButtonWithIcon extends Button {
  static defaultOpts = {
    components: {
      icon: {
        type: IconBox,
        as: 'is-small',
      },
      content: {
        html: 'span',
        renderIfEmpty: false
      }
    }
  }
  static OPTIONS = {
    icon: {
      initOrSet: function (v) {
        this.$icon.opt('icon', v)
      }
    }
  }
}
