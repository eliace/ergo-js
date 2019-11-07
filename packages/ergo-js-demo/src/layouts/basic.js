import {Html, Domain, Layout} from 'chorda-core'
import {Layouts, Box} from 'chorda-bulma'


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
