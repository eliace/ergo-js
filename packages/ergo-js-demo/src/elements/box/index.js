import {Layouts} from 'chorda-bulma'
import { ExampleBox } from '../../extensions'

import box1 from './box1'
import box1_text from '!raw-loader!./box1'

export default () => {
  return {
    layout: Layouts.Rows,
    items: [{
      as: ExampleBox,
      title: 'CSS',
      example: box1,
      code: box1_text
    }]
  }
}
