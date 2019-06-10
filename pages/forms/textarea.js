import {Html, Layouts, Box} from '../../src'



class Textarea extends Html {
  static defaultOpts = {
    html: 'textarea',
    as: 'textarea'
  }
}




export default (projector) => {
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
