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
        type: Textarea,
        placeholder: 'Enter text...'
      }
    }, {
      $content: {
        type: Textarea,
        placeholder: 'Enter text...',
        rows: 10
      }
    }, {
      $content: {
        type: Textarea,
        placeholder: 'Enter text...',
        as: 'has-fixed-size'
      }
    }]
  }
}
