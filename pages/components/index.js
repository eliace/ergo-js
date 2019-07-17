import {Html, Layouts, Tabs, Domain} from '../../src'

import TabsExample from './tabs'
import DropdownExample from './dropdown'

export default (projector) => {

  const data = new Domain({
    selected: 'Tabs'
  }, {
    computed: {
      tabs: (v) => v.selected == 'Tabs',
      dropdown: (v) => v.selected == 'Dropdown',
    }
  })


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
        text: 'Components'
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
          {text: 'Tabs'},
          {text: 'Dropdown'},
        ]
      }
    },
    $content: {
      components: false,
      dataChanged: function (v, key) {
        this.opt('$components', key)
      },
      $tabs: TabsExample(projector),
      $dropdown: DropdownExample(projector),
    }
  }
}
