import {Html, Layouts, Notification, Delete} from '../../src'

import {LOREM_IPSUM} from '../constants'

export default () => {
  return {
    layout: Layouts.Rows,
    $notification: {
      items: [{
        type: Notification,
        text: LOREM_IPSUM
      }]
    }
  }
}
