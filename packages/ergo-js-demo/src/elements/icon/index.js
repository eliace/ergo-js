import {Html} from 'chorda-core'
import {Layouts, IconBox, Action} from 'chorda-bulma'
import {ICONS} from '../../constants'
import { ExampleBox } from '../../extensions'

import icon1 from './icon1'
import icon1_code from '!raw-loader!./icon1'

export default () => {
  return {
    layout: Layouts.Rows,
    defaultItem: {
      as: ExampleBox
    },
    items: [{
      title: 'Font awesome',
      example: icon1,
      code: icon1_code
    }]
  }
}
