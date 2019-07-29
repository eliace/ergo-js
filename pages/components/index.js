import {Html, Domain} from '../../src'
import {Layouts, Tabs} from '../../bulma'

import TabsExample from './tabs'
import DropdownExample from './dropdown'
import BreadcrumbExample from './breadcrumb'
import CardExample from './card'
import MenuExample from './menu'
import ModalExample from './modal'

import {PreviewAndCode} from '../extensions'

import fs from 'fs'

function previewOf (exampleCreator, code) {
  return {
    base: PreviewAndCode,
    $preview: exampleCreator(),
    $code: {
      text: code
    }
  }
}

const ModalCode = fs.readFileSync(__dirname+'/modal.js', 'utf-8')
const MenuCode = fs.readFileSync(__dirname+'/menu.js', 'utf-8')
const CardCode = fs.readFileSync(__dirname+'/card.js', 'utf-8')
const BreadcrumbCode = fs.readFileSync(__dirname+'/breadcrumb.js', 'utf-8')
const DropdownCode = fs.readFileSync(__dirname+'/dropdown.js', 'utf-8')
const TabsCode = fs.readFileSync(__dirname+'/tabs.js', 'utf-8')


export default (projector) => {

  const data = new Domain({
    selected: 'Tabs'
  }, {
    computed: {
      tabs: (v) => v.selected == 'Tabs',
      dropdown: (v) => v.selected == 'Dropdown',
      breadcrumb: v => v.selected == 'Breadcrumb',
      card: v => v.selected == 'Card',
      menu: v => v.selected == 'Menu',
      modal: v => v.selected == 'Modal'
    }
  })


  return {
    sources: {
      data
    },
    layout: Layouts.Rows,
    $header: {
      as: 'example-header',
      layout: Layouts.Level,
      $title: {
        as: 'example-title',
        layout: Layouts.Content,
        $content: {
          html: 'h4'
        },
        text: 'Components'
      },
      $tabs: {
        type: Tabs,
        levelRight: true,
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
          {text: 'Menu'},
          {text: 'Modal'}
        ]
      }
    },
    $content: {
      components: false,
      dataChanged: function (v, key) {
        this.opt('$components', key)
      },
      $tabs: previewOf(TabsExample, TabsCode),
      $dropdown: previewOf(DropdownExample, DropdownCode),
      $breadcrumb: previewOf(BreadcrumbExample, BreadcrumbCode),
      $card: previewOf(CardExample, CardCode),
      $menu: previewOf(MenuExample, MenuCode),
      $modal: previewOf(ModalExample, ModalCode)
    }
  }
}
