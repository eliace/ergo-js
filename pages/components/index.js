import {Html, Layouts, Tabs, Source} from '../../src'

import TabsExample from './tabs'
import DropdownExample from './dropdown'

export default (projector) => {

  const Data = new Source({
    selected: 'Tabs'
  }, {
    computed: {
      tabs: (v) => v.selected == 'Tabs',
      dropdown: (v) => v.selected == 'Dropdown',
    }
  })


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
      dataChanged: function (v, key) {
        this.opt('$components', key)
      },
      $tabs: TabsExample(projector),
      $dropdown: DropdownExample(projector),
    }
  }
}
