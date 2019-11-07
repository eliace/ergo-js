import {Html, Domain} from 'chorda-core'
import {Layouts, Tabs} from 'chorda-bulma'

import InputExample from './input'
import TextareaExample from './textarea'
import SelectExample from './select'
import FieldExample from './field'
import CheckboxExample from './checkbox'
import SliderExample from './slider'

export default () => {

  const data = new Domain({
    selected: 'Input'
  }, {
    properties: {
      input: (v) => v.selected == 'Input',
      textarea: (v) => v.selected == 'Textarea',
      select: (v) => v.selected == 'Select',
      field: (v) => v.selected == 'Field',
      checkbox: (v) => v.selected == 'Checkbox',
      slider: (v) => v.selected == 'Slider',
    }
  })

//  console.log('box', Data.get('box'))
//  console.log(Data instanceof Function)

  return {
    sources: {
      data
    },
    layout: Layouts.Rows,
    $header: {
      $title: {
        layout: Layouts.Content,
        $content: {
          html: 'h3'
        },
        text: 'Forms'
      },
      $tabs: {
        sources: {
          __state: (ctx, o) => ctx.data
        },
        as: Tabs,
        // defaultTab: {
        //   dataChanged: function (v) {
        //     this.opt('selected', this.options.text == v.selected)
        //   },
        //   onClick: function (e, {data}) {
        //     data.set('selected', this.options.text)
        //   }
        // },
        tabs: [
          {text: 'Input'},
          {text: 'Textarea'},
          {text: 'Select'},
          {text: 'Field'},
          {text: 'Checkbox'},
          {text: 'Slider'},
        ]
      }
    },
    $content: {
      components: false,
      dataChanged: function (v, s, k) {
        this.opt('components', s.$iterator(k))
      },
      $input: InputExample(),
      $textarea: TextareaExample(),
      $select: SelectExample(),
      $field: FieldExample(),
      $checkbox: CheckboxExample(),
      $slider: SliderExample(),
    }
  }
}
