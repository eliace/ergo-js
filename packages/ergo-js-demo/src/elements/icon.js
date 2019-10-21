import {Html} from 'ergo-js-core'
import {Layouts, IconBox, Action} from 'ergo-js-bulma'
import {ICONS} from '../constants'
import { ExampleBox } from '../extensions'


export default () => {
  return {
    layout: Layouts.Rows,
    defaultItem: {
      as: ExampleBox
    },
    items: [{
      title: 'Font awesome',
      example: {
        defaultItem: {
          as: IconBox,
          css: 'is-action',
          onClick: function (e, {toasts}) {
            toasts.show({text: this.opt('tag')})
          }
        },
        items: ICONS.map(i => {
          return {icon: 'fas fa-'+i, tag: i}
        })  
      }
    }]
  }
}
