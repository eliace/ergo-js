import {Html} from '../../src'
import {Layouts, Box} from '../../bulma'



class Select extends Html {
  static defaultOpts = {
    css: 'select',
    $content: {
      html: 'select',
      defaultItem: {
        html: 'option'
      }  
    }
  }
}



export default () => {
  return {
    layout: Layouts.Rows,
    width: 500,
    items: [{
      as: Select,
      $content: {
        //      text: 'Select option...',
        items: ['Alice', 'Bob', 'Charlie']        
      }
    }]
  }
}
