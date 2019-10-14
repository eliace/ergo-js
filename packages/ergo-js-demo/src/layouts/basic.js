import {Html, Domain, Layout} from 'ergo-js-core'
import {Layouts, Box} from 'ergo-js-bulma'


export default () => {
  return {
    layout: Layouts.Rows,
    items: [{
      layout: Layout.simple,
      $content: {
        text: 'Hello'
      },
      $box: {
        as: Box
      }
    }, {
      layout: Layout.wrapped,
      $content: {
        text: 'Hello'
      },
      $wrapper: {
        as: Box,
        css: 'has-text-link'
      }
    }, {

    }]
  }
}
