import {Html, Text} from '../../src'
import Delete from './Delete'

class Notification extends Html {

  static defaultOpts = {
    as: 'notification',
    components: {
      closeBtn: {
        type: Delete
      },
      content: {
//        html: 'div'
        type: Text
      }
    }
  }

}

export default Notification
