import {Html, Layouts, Notification, Delete} from '../../src'

import {LOREM_IPSUM} from '../constants'

export default () => {
  return {
    layout: Layouts.Rows,
    items: [{
      defaultItem: {
        type: Notification,
        text: LOREM_IPSUM.slice(0, 140),
        width: 600
      },
      items: [
        {as: 'is-primary'},
        {as: 'is-link'},
        {as: 'is-info'},
        {as: 'is-success'},
        {as: 'is-warning'},
        {as: 'is-danger'},
      ]
    }]
  }
}
