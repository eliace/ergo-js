import {Html, Domain, Layout} from '../../src'
import {Layouts, Box} from '../../bulma'


export default () => {
  return {
    layout: Layouts.Rows,
    items: [{
      layout: Layout.simple,
      $content: {
        text: 'Hello'
      },
      $box: {
        base: Box
      }
    }, {
      layout: Layout.wrapped,
      $content: {
        text: 'Hello'
      },
      $wrapper: {
        base: Box,
        as: 'has-text-link'
      }
    }, {

    }]
  }
}
