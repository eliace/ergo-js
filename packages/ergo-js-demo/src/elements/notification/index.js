import {Layouts} from 'chorda-bulma'
import { ExampleBox } from '../../extensions'

import notification1 from './notification1'
import notification1_code from '!raw-loader!./notification1'

export default () => {
  return {
    layout: Layouts.Rows,
    items: [{
      as: ExampleBox,
      title: 'Colors',
      example: notification1,
      code: notification1_code
    }]
  }
}
