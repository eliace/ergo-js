import {Html} from '../../src'
import {Layouts, Delete} from '../../bulma'

export default () => {
  return {
    layout: Layouts.Rows,
    items: [{
      base: Delete
    }]
  }
}
