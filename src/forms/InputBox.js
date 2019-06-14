import {Html} from '../core'


class InputBox extends Html {
  static defaultOpts = {
    as: 'input-box',
    components: {
      input: {
        html: 'input',
        as: 'input'
      }
    }
  }
  static OPTIONS = {
    placeholder: {
      initOrSet: function (v) {
        this.$input.opt('placeholder', v)
      }
    }
  }
}


export default InputBox
