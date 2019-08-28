import {Html} from '../../src'
import {Layouts, Button, Buttons, IconBox} from '../../bulma'

import {Mixins} from '../helpers'
import {ButtonWithIcon} from '../extensions'


export default () => {
  return {
    layout: Layouts.Rows,
    items: [{
      base: Button,
      text: 'Button'
    }, {
      base: Buttons,
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
      base: Buttons,
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
      base: Buttons,
      defaultItem: {
        base: ButtonWithIcon,
      },
      items: [
        {icon: 'fas fa-bold'},
        {icon: 'fas fa-italic'},
        {icon: 'fas fa-underline'},
      ]
    }, {
      base: Buttons,
      defaultItem: {
        base: ButtonWithIcon,
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
