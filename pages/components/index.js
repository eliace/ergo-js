import {Html, Layouts, Tabs, Domain} from '../../src'

import TabsExample from './tabs'
import DropdownExample from './dropdown'
import BreadcrumbExample from './breadcrumb'
import CardExample from './card'
import MenuExample from './menu'

export default (projector) => {

  const data = new Domain({
    selected: 'Tabs'
  }, {
    computed: {
      tabs: (v) => v.selected == 'Tabs',
      dropdown: (v) => v.selected == 'Dropdown',
      breadcrumb: v => v.selected == 'Breadcrumb',
      card: v => v.selected == 'Card',
      menu: v => v.selected == 'Menu'
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
          {text: 'Breadcrumb'},
          {text: 'Card'},
          {text: 'Menu'}
        ]
      }
    },
    $content: {
      components: false,
      dataChanged: function (v, key) {
        this.opt('$components', key)
      },
      $tabs: TabsExample(),
      $dropdown: DropdownExample(),
      $breadcrumb: BreadcrumbExample(),
      $card: CardExample(),
      $menu: MenuExample()
    }
  }
}
