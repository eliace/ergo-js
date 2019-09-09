import {Html} from '../../src'
import {Layouts, IconBox} from '../../bulma'
import {ICONS} from '../constants'

export default () => {
  return {
    layout: Layouts.Rows,
    items: [{
      defaultItem: {
        as: IconBox
      },
      items: ICONS.map(i => {return {icon: 'fas fa-'+i}})
    }]
  }
}
