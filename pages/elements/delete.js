import {Html, Layouts, Delete} from '../../src'

export default (projector) => {
  return {
    layout: Layouts.Rows,
    items: [{
      type: Delete
    }]
  }
}
