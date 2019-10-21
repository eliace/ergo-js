import {Html, Text} from 'ergo-js-core'
import {Layouts, Button, Buttons, IconBox, Action} from 'ergo-js-bulma'

import {Mixins} from '../helpers'
import {ButtonWithIcon, ExampleBox} from '../extensions'

import button1 from './button1'
import button1_code from 'raw-loader!./button1'
import button2 from './button2'
import button2_code from 'raw-loader!./button2'

export default () => {
  return {
    layout: Layouts.Rows,
    defaultItem: {
      as: ExampleBox,
    },
    items: [{
      title: 'Default',
      example: button1,
      code: button1_code
    }, {
      title: 'Buttons',
      example: button2,
      code: button2_code
    }, {
      title: 'Buttons (addons)',
      example: {
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
      }
    }, {
      title: 'Icon',
      example: {
        as: Buttons,
        defaultItem: {
          as: Button,//WithIcon,
        },
        items: [
          {icon: 'fas fa-bold'},
          {icon: 'fas fa-italic'},
          {icon: 'fas fa-underline'},
        ]  
      }
    }, {
      title: 'Icon + Text',
      example: {
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
      }
    }, {
      title: 'Action (tool)',
      example: {
        as: Action,
        text: 'Click to action',
        css: 'is-link is-muted',
        icon: 'fas fa-star'  
      }
    }]
  }
}
