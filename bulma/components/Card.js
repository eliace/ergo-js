import {Html} from '../../src'


export default class Card extends Html {
  config () {
    return {
      as: 'card',
      components: {
        image: false,
        footer: false
      },
      $header: {
        as: 'card-header'
      },
      $image: {
        as: 'card-image'
      },
      $content: {
        as: 'card-content'
      },
      $footer: {
        as: 'card-footer',
        defaultItem: {
          as: 'card-footer-item'
        }
      }
    }
  }
}
