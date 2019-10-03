import {Html, Text} from '../../src'
import Delete from './Delete'

class Notification extends Html {
  config () {
    return {
      css: 'notification',
      $closeBtn: {
        as: Delete
      },
      $content: {
        as: Html.Text
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
