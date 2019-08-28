import {Html} from '../../src'
import {Layouts, IconBox} from '../../bulma'

export default () => {
  return {
    layout: Layouts.Rows,
    items: [{
      base: IconBox,
      icon: 'fas fa-envelope'
    }]
  }
}
