import {Html, Text} from 'ergo-js-core'
import {Layouts, Button, Buttons, IconBox, Action} from 'ergo-js-bulma'

import {Mixins} from '../helpers'
import {ButtonWithIcon} from '../extensions'



export default () => {
  return {
    layout: Layouts.Rows,
    items: [{
      as: Button,
      text: 'Button'
    }, {
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
    }, {
      sources: {
        selection: 'Bob'
      },
      as: Buttons,
      css: 'has-addons',
      defaultItem: {
        mixins: [Mixins.Selectable2],
        onSelected: function (v) {
          // в качестве стороннего эффекта устанавливаем класс is-info
          this.opt('classes', {'is-info': v})
        }
      },
      items: ['Alice', 'Bob', 'Charlie']
    }, {
      as: Buttons,
      defaultItem: {
        as: Button,//WithIcon,
      },
      items: [
        {icon: 'fas fa-bold'},
        {icon: 'fas fa-italic'},
        {icon: 'fas fa-underline'},
      ]
    }, {
      as: Buttons,
      defaultItem: {
        as: Button,//WithIcon,
      },
      items: [
        {icon: 'fab fa-github', text: 'GitHub'},
        {icon: 'fab fa-twitter', text: 'Twitter', css: 'is-primary'},
        {icon: 'fas fa-check', text: 'Save', css: 'is-success'},
        {icon: 'fas fa-times', text: 'Delete', css: 'is-danger is-outlined'},
      ]
    }, {
      as: Action,
      text: 'Click to action',
      css: 'is-link is-muted',
      icon: 'fas fa-star'
    }]
  }
}
