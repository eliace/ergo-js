import {Html} from 'chorda-core'


export default class Breadcrumb extends Html {

  config () {
    return {
      html: 'nav',
      css: 'breadcrumb',
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
          css: 'is-active',
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
