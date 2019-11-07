import {Html} from 'chorda-core'
import { Image } from '../elements'


export default class Card extends Html {
  config () {
    return {
      css: 'card',
      components: {
        image: false,
        footer: false
      },
      $header: {
        css: 'card-header',
        weight: -20
      },
      $image: {
        css: 'card-image',
        $content: {
          as: Image
        },
        weight: -10
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
  properties () {
    return {
      image: {
        set: function (v) {
          this.opt('components', {image: v})
        }
      },
      title: {
        set: function (v) {
          this.$header.opt('text', v)
        }
      }
    }
  }
}
