import {Html} from 'ergo-js-core'
import {Layouts, Box} from 'ergo-js-bulma'



class Select extends Html {
  config () {
    return {
      css: 'select',
      $content: {
        html: 'select',
        defaultItem: {
          html: 'option'
        }  
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
