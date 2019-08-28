import {Html, Text} from '../../src'
import Delete from './Delete'

class Notification extends Html {

  static defaultOpts = {
    as: 'notification',
    components: {
      closeBtn: {
        base: Delete
      },
      content: {
//        html: 'div'
        base: Text
      }
    }
  }

}

export default Notification
