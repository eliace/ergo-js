import {Html} from '../../src'


class InputBox extends Html {
  config () {
    return {
      css: 'input-box',
      $input: {
        html: 'input',
        css: 'input'
      }
    }
  }
  options () {
    return {
      placeholder: {
        initOrSet: function (v) {
          this.$input.opt('placeholder', v)
        }
      }  
    }
  }
}


export default InputBox
