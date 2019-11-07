import {Layouts} from 'chorda-bulma'
import {ExampleBox} from '../../extensions'

import button1 from './button1'
import button1_code from '!raw-loader!./button1'
import button2 from './button2'
import button2_code from '!raw-loader!./button2'
import button3 from './button3'
import button3_code from '!raw-loader!./button3'
import button4 from './button4'
import button4_code from '!raw-loader!./button4'
import button5 from './button5'
import button5_code from '!raw-loader!./button5'
import button6 from './button6'
import button6_code from '!raw-loader!./button6'

export default () => {
  return {
    layout: Layouts.Rows,
    defaultItem: {
      as: ExampleBox,
    },
    items: [{
      title: 'Default',
      example: button1,
      code: button1_code
    }, {
      title: 'Buttons',
      example: button2,
      code: button2_code
    }, {
      title: 'Buttons (addons)',
      example: button3,
      code: button3_code
    }, {
      title: 'Icon',
      example: button4,
      code: button4_code
    }, {
      title: 'Icon + Text',
      example: button5,
      code: button5_code
    }, {
      title: 'Action (tool)',
      example: button6,
      code: button6_code
    }]
  }
}
