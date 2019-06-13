import {Html, Layouts, Button} from '../../src'



class Field extends Html {
  static defaultOpts = {
    as: 'field',
    components: {
      label: {
        as: 'label',
        rendering: false
      },
      control: {
        as: 'control'
      },
      help: {
        as: 'help',
        rendering: false
      }
    }
  }
}




export default (projector) => {
  return {
    layout: Layouts.Rows,
    width: 500,
    items: [{
      type: Field,
      $label: {
        text: 'Button',
        rendering: true
      },
      $control: {
        $content: {
          type: Button,
          text: 'Press me'
        }
      },
      $help: {
        text: 'Some action',
        rendering: true
      }
    }]
  }
}
