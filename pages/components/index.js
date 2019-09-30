import {Html, Domain} from '../../src'
import {Layouts, Tabs} from '../../bulma'

import TabsExample from './tabs'
import DropdownExample from './dropdown'
import BreadcrumbExample from './breadcrumb'
import CardExample from './card'
import MenuExample from './menu'
import ModalExample from './modal'
import NavbarExample from './navbar'
import PaginationExample from './pagination'
import ToastExample from './toast'
import ListExample from './list'

import {PreviewAndCode} from '../extensions'

import fs from 'fs'

function previewOf (exampleCreator, code) {
  return {
    as: PreviewAndCode,
    $preview: exampleCreator,
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
const NavbarCode = fs.readFileSync(__dirname+'/navbar.js', 'utf-8')
const PaginationCode = fs.readFileSync(__dirname+'/pagination.js', 'utf-8')
const ToastCode = fs.readFileSync(__dirname+'/toast.js', 'utf-8')
const ListCode = fs.readFileSync(__dirname+'/list.js', 'utf-8')


export default () => {

  const data = new Domain({
    selected: 'Tabs'
  }, {
    properties: {
      tabs: (v) => v.selected == 'Tabs',
      dropdown: (v) => v.selected == 'Dropdown',
      breadcrumb: v => v.selected == 'Breadcrumb',
      card: v => v.selected == 'Card',
      menu: v => v.selected == 'Menu',
      modal: v => v.selected == 'Modal',
      navbar: v => v.selected == 'Navbar',
      pagination: v => v.selected == 'Pagination',
      toast: v => v.selected == 'Toast',
      list: v => v.selected == 'List',
    }
  })


  return {
    sources: {
      data
    },
    layout: Layouts.Rows,
    $header: {
      css: 'example-header',
      layout: Layouts.Level,
      $title: {
        css: 'example-title',
        layout: Layouts.Content,
        $content: {
          html: 'h4'
        },
        text: 'Components'
      },
      $tabs: {
        as: Tabs,
        levelRight: true,
        sources: {
          __state: (o, ctx) => ctx.data
        },
        // defaultTab: {
        //   dataChanged: function (v) {
        //     this.opt('selected', this.opts.text == v.selected)
        //   },
        //   onClick: function (e, {data}) {
        //     data.set('selected', this.opts.text)
        //   }
        // },
        tabs: [
          {text: 'Tabs'},
          {text: 'Dropdown'},
          {text: 'Breadcrumb'},
          {text: 'Card'},
          {text: 'Menu'},
          {text: 'Modal'},
          {text: 'Navbar'},
          {text: 'Pagination'},
          {text: 'Toast'},
          {text: 'List'},
        ]
      }
    },
    $content: {
      components: false,
      dataChanged: function (v, stream) {
        this.opt('components', stream)
      },
      $tabs: previewOf(TabsExample, TabsCode),
      $dropdown: previewOf(DropdownExample, DropdownCode),
      $breadcrumb: previewOf(BreadcrumbExample, BreadcrumbCode),
      $card: previewOf(CardExample, CardCode),
      $menu: previewOf(MenuExample, MenuCode),
      $modal: previewOf(ModalExample, ModalCode),
      $navbar: previewOf(NavbarExample, NavbarCode),
      $pagination: previewOf(PaginationExample, PaginationCode),
      $toast: previewOf(ToastExample, ToastCode),
      $list: previewOf(ListExample, ListCode),
    }
  }
}
