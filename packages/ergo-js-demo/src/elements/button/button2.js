import { Buttons } from 'chorda-bulma'

export default () => {
    return {
        as: Buttons,
        items: [{
          html: 'a',
          text: 'Link'
        }, {
          html: 'button',
          text: 'Button'
        }, {
          html: 'input',
          type: 'submit',
          value: 'Submit'
        }, {
          html: 'input',
          type: 'reset',
          value: 'Reset'
        }]  
    }
}