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
        as: Image,
        src: imgUrl_1,
      },
      items: [
        {css: 'is-16x16'},
        {css: 'is-24x24'},
        {css: 'is-32x32'},
        {css: 'is-48x48'},
        {css: 'is-64x64'},
        {css: 'is-96x96'},
        {css: 'is-128x128'},
        {
          css: 'is-128x128',
          $content: {css: 'is-rounded'}
        },
      ]
    }, {
      $content: {
        $image: {
          as: Image,
          src: imgUrl_2,
          width: 512
//          height: 512
        }
      }
    }]
  }
}
