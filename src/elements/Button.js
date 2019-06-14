import {Html} from '../core'

export default class Button extends Html {

  static defaultOpts = {
    html: 'button',
    tabIndex: 0,
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
