import {Html} from 'ergo-js-core'
import {Layouts, Notification, Delete} from 'ergo-js-bulma'

import {LOREM_IPSUM} from '../constants'

export default () => {
  return {
    layout: Layouts.Rows,
    items: [{
      defaultItem: {
        as: Notification,
        text: LOREM_IPSUM.slice(0, 140)
      },
      items: [
        {css: 'is-primary'},
        {css: 'is-link'},
        {css: 'is-info'},
        {css: 'is-success'},
        {css: 'is-warning'},
        {css: 'is-danger'},
      ]
    }]
  }
}
