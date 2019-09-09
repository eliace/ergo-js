import {Html} from '../../src'
import {Layouts, Box} from '../../bulma'



class Select extends Html {
  static defaultOpts = {
    css: 'select',
    $content: {

    }
  }
}




export default () => {
  return {
    layout: Layouts.Rows,
    width: 500,
    items: [{
      $content: {
        as: Select,
        text: 'Select option...'
      }
    }]
  }
}
