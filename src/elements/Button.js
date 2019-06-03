import {Html} from '../core'

export default class Button extends Html {

  static defaultOpts = {
    html: 'button',
    props: {
      class: 'button'
    }
  }

  static OPTIONS = {
    selected: {
      set: function (v) {
        this.opt('classes', {'is-selected': v})
      }
    }
  }

}
