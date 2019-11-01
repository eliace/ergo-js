import {Layouts} from 'ergo-js-bulma'
import { ExampleBox } from '../../extensions'

import alert1 from './alert1'
import alert1_code from '!raw-loader!./alert1'

export default () => {
  return {
    layout: Layouts.Rows,
    items: [{
      as: ExampleBox,
      title: 'Colors',
      example: alert1,
      code: alert1_code
    }]
  }
}
