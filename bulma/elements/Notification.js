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
        as: Text
      }
    }
  }

  options () {
    return {
      color: {
        initOrSet: function (v) {
          this.opt('classes', {['is-'+v]: true})
        }
      }
    }
  }

}

export default Notification
