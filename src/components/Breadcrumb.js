import {Html} from '../core'


export default class Breadcrumb extends Html {

  config () {
    return {
      html: 'nav',
      as: 'breadcrumb',
      $content: {
        html: 'ul',
        defaultItem: {
          html: 'li',
          $content: {
            html: 'a',
            href: '#'
          }
        },
        $last: {
          html: 'li',
          as: 'is-active',
          weight: 10,
          $content: {
            html: 'a',
            href: '#'
          }
        }
      }
    }
  }

}
