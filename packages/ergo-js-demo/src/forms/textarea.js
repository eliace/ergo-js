import {Html} from 'chorda-core'
import {Layouts, Box} from 'chorda-bulma'



class Textarea extends Html {
  config () {
    return {
      html: 'textarea',
      css: 'textarea'  
    }
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
