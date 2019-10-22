import {Html} from 'ergo-js-core'
import {Layouts, Box, Title} from 'ergo-js-bulma'
import { ExampleBox } from '../extensions'

import box1 from './box1'
import box1_text from '!raw-loader!./box1'

export default () => {
  return {
    layout: Layouts.Rows,
    items: [{
      as: ExampleBox,
      title: 'CSS',
      example: box1,/*{
        layout: Layouts.Columns,
        defaultItem: {
          as: Box,
          text: "I'm a Box"
        },
        items: [{
        }, {
          css: 'has-text-info',
        }, {
          css: 'has-background-primary has-text-light',
        }, {
          css: 'has-background-warning'
        }]  
      },*/
      code: box1_text
    }]
  }
}
