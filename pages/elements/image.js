import {Html} from '../../src'
import {Layouts, Image} from '../../bulma'

import imgUrl_1 from '../img/Yosemite.jpg'
import imgUrl_2 from '../img/Yosemite 3.jpg'


export default () => {
  return {
    layout: Layouts.Rows,
    items: [{
      // layout: Layouts.Columns,
      style: {
        display: 'flex',
        justifyContent: 'space-around'
      },
      defaultItem: {
        base: Image,
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
          base: Image,
          src: imgUrl_2,
          width: 512
//          height: 512
        }
      }
    }]
  }
}
