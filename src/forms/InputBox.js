import {Html} from '../core'


class InputBox extends Html {
  static defaultOpts = {
    as: 'control',
    components: {
      input: {
        html: 'input',
        as: 'input'
      }
    }
  }
}
