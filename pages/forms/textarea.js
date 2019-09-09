import {Html} from '../../src'
import {Layouts, Box} from '../../bulma'



class Textarea extends Html {
  static defaultOpts = {
    html: 'textarea',
    css: 'textarea'
  }
}




export default () => {
  return {
    layout: Layouts.Rows,
    width: 500,
    items: [{
      $content: {
        as: Textarea,
        placeholder: 'Enter text...'
      }
    }, {
      $content: {
        as: Textarea,
        placeholder: 'Enter text...',
        rows: 10
      }
    }, {
      $content: {
        as: Textarea,
        placeholder: 'Enter text...',
        css: 'has-fixed-size'
      }
    }]
  }
}
