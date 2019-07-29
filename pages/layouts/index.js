import {Html, Domain} from '../../src'
import {Layouts, Tabs} from '../../bulma'

import BasicExample from './basic'


export default () => {

  const page = new Domain({
    selected: 'Basic'
  }, {
    properties: {
      basic: {
        calc: v => v.selected == 'Basic'
      }
    }
  })

  const data = new Domain({
    tabs: ['Basic']
  })

  return {
    sources: { page, data },
    layout: Layouts.Rows,
    $header: {
      $title: {
        layout: Layouts.Content,
        $content: {
          html: 'h3'
        },
        text: 'Layouts'
      },
      $tabs: {
        type: Tabs,
        defaultTab: {
          pageChanged: function (v) {
            this.opt('selected', this.opt('text') == v.selected)
          },
          dataChanged: function (v) {
            this.opt('text', v)
          },
          onClick: function (e, {data}) {
            page.set('selected', this.options.text)
          }
        },
        dataChanged: function (v, k, d) {
          this.opt('$tabs', d.entry('tabs').asStream(k))
        }
//        tabs: ['Basic']
      }
    },
    $content: {
      components: false,
      pageChanged: function (v, key) {
        this.opt('$components', key)
      },
      $basic: BasicExample(),
      // $textarea: TextareaExample(),
      // $select: SelectExample(),
      // $field: FieldExample(),
      // $checkbox: CheckboxExample(),
    }
  }
}
