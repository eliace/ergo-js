import {Html} from 'chorda-core'
import {Layouts, Delete} from 'chorda-bulma'

export default () => {
  return {
    layout: Layouts.Rows,
    items: [{
      as: Delete
    }]
  }
}
