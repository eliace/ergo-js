import {Html, Layouts, Box} from '../../src'



class Select extends Html {
  static defaultOpts = {
    as: 'select',
    $content: {

    }
  }
}




export default (projector) => {
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
