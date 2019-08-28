import {Html} from '../../src'
import {Button} from '../elements'

class Buttons extends Html {
  static defaultOpts = {
    as: 'buttons',
    defaultItem: {
      base: Button
    }
  }
}

export default Buttons
