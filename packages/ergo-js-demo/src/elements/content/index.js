import {Html} from 'chorda-core'
import {Layouts, List, Delete} from 'chorda-bulma'

import {LOREM_IPSUM} from '../../constants'
import { ExampleBox } from '../../extensions'

import list from './list'
import list_code from '!raw-loader!./list'
import dl from './dl'
import dl_code from '!raw-loader!./dl'

export default () => {
  return {
    layout: Layouts.Rows,
    defaultItem: {
      as: ExampleBox
    },
    items: [{
      title: 'List',
      example: list,
      code: list_code
    }, {
      title: 'Definitions List',
      example: dl,
      code: dl_code
    }, {
      title: 'Heading',
      example: {
        layout: Layouts.Content,
        items: [{
          items: [1,2,3,4,5,6].map((itm, i) => {return {html: 'h'+(i+1), text: 'Heading '+(i+1)}})
        }]  
      }
    }, {
      title: 'Quote',
      example: {
        layout: Layouts.Content,
        items: [{
          html: 'blockquote',
          text: LOREM_IPSUM
        }]  
      }
    }]
  }
}
