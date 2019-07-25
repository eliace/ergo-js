import {Html} from '../../src'
import {Layouts, Box} from '../../bulma'



class Select extends Html {
  static defaultOpts = {
    as: 'select',
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
        type: Select,
        text: 'Select option...'
      }
    }]
  }
}
