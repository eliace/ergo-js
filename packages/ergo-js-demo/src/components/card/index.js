import {Html, Domain} from 'ergo-js-core'
import {Layouts, Card, Image} from 'ergo-js-bulma'
import { ExampleBox } from '../../extensions'

import card1 from './card1'
import card1_code from '!raw-loader!./card1'

export default () => {
  return {
    layout: Layouts.Row,
    defaultItem: {
      as: ExampleBox
    },
    items: [{
      title: 'Image',
      example: card1,
      code: card1_code
    }]
  }
}
