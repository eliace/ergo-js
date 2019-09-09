import {Html} from '../../src'


class InputBox extends Html {
  static defaultOpts = {
    css: 'input-box',
    components: {
      input: {
        html: 'input',
        css: 'input'
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
