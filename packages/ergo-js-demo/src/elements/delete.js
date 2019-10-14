import {Html} from 'ergo-js-core'
import {Layouts, Delete} from 'ergo-js-bulma'

export default () => {
  return {
    layout: Layouts.Rows,
    items: [{
      as: Delete
    }]
  }
}
