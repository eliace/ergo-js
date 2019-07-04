import {Html, Layouts, Button, Buttons, IconBox} from '../../src'

import {Mixins} from '../helpers'
import {ButtonWithIcon} from '../extensions'


export default (projector) => {
  return {
    layout: Layouts.Rows,
    items: [{
      type: Button,
      text: 'Button'
    }, {
      type: Buttons,
      items: [{
        html: 'a',
        text: 'Link'
      }, {
        html: 'button',
        text: 'Button'
      }, {
        html: 'input',
        _type: 'submit',
        value: 'Submit'
      }, {
        html: 'input',
        _type: 'reset',
        value: 'Reset'
      }]
    }, {
      sources: {
        selection: 'Bob'
      },
      type: Buttons,
      as: 'has-addons',
      defaultItem: {
        mixins: [Mixins.Selectable2],
        onSelected: function (v) {
          // в качестве стороннего эффекта устанавливаем класс is-info
          this.opt('classes', {'is-info': v})
        }
      },
      items: ['Alice', 'Bob', 'Charlie']
    }, {
      type: Buttons,
      defaultItem: {
        type: ButtonWithIcon,
      },
      items: [
        {icon: 'fas fa-bold'},
        {icon: 'fas fa-italic'},
        {icon: 'fas fa-underline'},
      ]
    }, {
      type: Buttons,
      defaultItem: {
        type: ButtonWithIcon,
      },
      items: [
        {icon: 'fab fa-github', text: 'GitHub'},
        {icon: 'fab fa-twitter', text: 'Twitter', as: 'is-primary'},
        {icon: 'fas fa-check', text: 'Save', as: 'is-success'},
        {icon: 'fas fa-times', text: 'Delete', as: 'is-danger is-outlined'},
      ]
    }]
  }
}
