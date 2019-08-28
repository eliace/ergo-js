import {Html} from '../../src'
import {Layouts, Box} from '../../bulma'



class Textarea extends Html {
  static defaultOpts = {
    html: 'textarea',
    as: 'textarea'
  }
}




export default () => {
  return {
    layout: Layouts.Rows,
    width: 500,
    items: [{
      $content: {
        base: Textarea,
        placeholder: 'Enter text...'
      }
    }, {
      $content: {
        base: Textarea,
        placeholder: 'Enter text...',
        rows: 10
      }
    }, {
      $content: {
        base: Textarea,
        placeholder: 'Enter text...',
        as: 'has-fixed-size'
      }
    }]
  }
}
