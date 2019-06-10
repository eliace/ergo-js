import {Html, Layouts, IconBox} from '../../src'

export default (projector) => {
  return {
    layout: Layouts.Rows,
    items: [{
      type: IconBox,
      icon: 'fas fa-envelope'
    }]
  }
}
