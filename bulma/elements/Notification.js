import {Html, Text} from '../../src'
import Delete from './Delete'

class Notification extends Html {

  static defaultOpts = {
    css: 'notification',
    components: {
      closeBtn: {
        as: Delete
      },
      content: {
//        html: 'div'
        as: Text
      }
    }
  }

}

export default Notification
