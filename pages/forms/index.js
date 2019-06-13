import {Html, Layouts, Tabs, Source} from '../../src'

import InputExample from './input'
import TextareaExample from './textarea'
import SelectExample from './select'
import FieldExample from './field'

export default (projector) => {

  const Data = new Source({
    selected: 'Input'
  }, null, {
    computed: {
      input: (v) => v.selected == 'Input',
      textarea: (v) => v.selected == 'Textarea',
      select: (v) => v.selected == 'Select',
      field: (v) => v.selected == 'Field',
    }
  })

//  console.log('box', Data.get('box'))
//  console.log(Data instanceof Function)

  return {
    sources: {
      data: Data
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
        type: Tabs,
        defaultTab: {
          dataChanged: function (v) {
            this.opt('selected', this.options.text == v.selected)
          },
          onClick: function () {
            this.sources.data.set('selected', this.options.text)
          }
        },
        tabs: [
          {text: 'Input'},
          {text: 'Textarea'},
          {text: 'Select'},
          {text: 'Field'},
        ]
      }
    },
    $content: {
      dynamic: true,
      dataChanged: function (v, key) {
        this.opt('$components', key)
      },
      $input: InputExample(projector),
      $textarea: TextareaExample(projector),
      $select: SelectExample(projector),
      $field: FieldExample(projector),
    }
  }
}
