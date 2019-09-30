import {Html} from '../../src'
import {Layouts, IconBox, Action} from '../../bulma'
import {ICONS} from '../constants'


export default () => {
  return {
    layout: Layouts.Rows,
    items: [{
      defaultItem: {
        as: IconBox,
        css: 'is-action',
        onClick: function (e, {toasts}) {
          toasts.show({text: this.opt('value')})
        }
      },
      items: ICONS.map(i => {
        return {icon: 'fas fa-'+i, value: i}
      })
    }]
  }
}
