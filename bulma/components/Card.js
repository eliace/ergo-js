import {Html} from '../../src'


export default class Card extends Html {
  config () {
    return {
      css: 'card',
      components: {
        image: false,
        footer: false
      },
      $header: {
        css: 'card-header'
      },
      $image: {
        css: 'card-image'
      },
      $content: {
        css: 'card-content'
      },
      $footer: {
        css: 'card-footer',
        defaultItem: {
          css: 'card-footer-item'
        }
      }
    }
  }
}
