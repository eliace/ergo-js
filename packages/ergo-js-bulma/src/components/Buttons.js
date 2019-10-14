import {Html} from 'ergo-js-core'
import {Button} from '../elements'

class Buttons extends Html {
  config () {
    return {
      css: 'buttons',
      defaultItem: {
        as: Button
      },
      defaultComponent: {
        as: Button
      }
    }
  }
}

export default Buttons
