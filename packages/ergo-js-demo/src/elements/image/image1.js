import {Image} from 'chorda-bulma'

import imgUrl_1 from '../../img/Yosemite.jpg'

export default () => {
    return {
        style: {
            display: 'flex',
            justifyContent: 'space-around',
            width: '100%'
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
    }
}