import {Html, Text} from 'chorda-core'
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
  properties () {
    return {
      color: {
        set: function (v) {
          this.opt('classes', {['is-'+v]: true})
        }
      }
    }
  }
}

export default Notification
