import {Html, Layouts, Image} from '../../src'

import imgUrl_1 from '../img/Yosemite.jpg'
import imgUrl_2 from '../img/Yosemite 3.jpg'


export default (projector) => {
  return {
    layout: Layouts.Rows,
    items: [{
      // layout: Layouts.Columns,
      styles: {
        'display': 'flex',
        'justify-content': 'space-around'
      },
      defaultItem: {
        type: Image,
        src: imgUrl_1,
      },
      items: [
        {as: 'is-16x16'},
        {as: 'is-24x24'},
        {as: 'is-32x32'},
        {as: 'is-48x48'},
        {as: 'is-64x64'},
        {as: 'is-96x96'},
        {as: 'is-128x128'},
        {
          as: 'is-128x128',
          $content: {as: 'is-rounded'}
        },
      ]
    }, {
      $content: {
        $image: {
          type: Image,
          src: imgUrl_2,
          width: 512,
//          height: 512
        }
      }
    }]
  }
}