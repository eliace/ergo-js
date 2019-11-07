import {Html, Domain} from 'chorda-core'
import {Layouts, Tabs} from 'chorda-bulma'

import TabsExample from './tabs'
import BreadcrumbExample from './breadcrumb'
import CardExample from './card'
import MenuExample from './menu'
import ModalExample from './modal'
import NavbarExample from './navbar'
import PaginationExample from './pagination'

import {PreviewAndCode} from '../extensions'

//import fs from 'fs'

function previewOf (exampleCreator, code) {
  return {
    as: PreviewAndCode,
    $preview: exampleCreator,
    $code: {
      text: code
    }
  }
}

//import ModalCode from 'raw-loader!./modal.js'//fs.readFileSync(__dirname+'/modal.js', 'utf-8')
import MenuCode from 'raw-loader!./menu'//fs.readFileSync(__dirname+'/menu.js', 'utf-8')
const CardCode = ''//fs.readFileSync(__dirname+'/card.js', 'utf-8')
const BreadcrumbCode = ''//fs.readFileSync(__dirname+'/breadcrumb.js', 'utf-8')
const TabsCode = ''//fs.readFileSync(__dirname+'/tabs.js', 'utf-8')
const NavbarCode = ''//fs.readFileSync(__dirname+'/navbar.js', 'utf-8')
const PaginationCode = ''//fs.readFileSync(__dirname+'/pagination.js', 'utf-8')


export default () => {

  const data = new Domain({
    selected: 'Tabs'
  }, {
    properties: {
      tabs: (v) => v.selected == 'Tabs',
      breadcrumb: v => v.selected == 'Breadcrumb',
      card: v => v.selected == 'Card',
      menu: v => v.selected == 'Menu',
      modal: v => v.selected == 'Modal',
      navbar: v => v.selected == 'Navbar',
      pagination: v => v.selected == 'Pagination',
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
        level: Layouts.Level.RIGHT,
        sources: {
          __state: (ctx, o) => ctx.data
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
          {text: 'Breadcrumb'},
          {text: 'Card'},
          {text: 'Menu'},
          {text: 'Modal'},
          {text: 'Navbar'},
          {text: 'Pagination'},
        ]
      }
    },
    $content: {
      components: false,
      dataChanged: function (v, s, k) {
        this.opt('components', s.$iterator(k))
      },
      $tabs: previewOf(TabsExample, TabsCode),
      $breadcrumb: previewOf(BreadcrumbExample, BreadcrumbCode),
      $card: CardExample,//previewOf(CardExample, CardCode),
      $menu: previewOf(MenuExample, MenuCode),
      $modal: ModalExample,//previewOf(ModalExample, ModalCode),
      $navbar: previewOf(NavbarExample, NavbarCode),
      $pagination: previewOf(PaginationExample, PaginationCode),
    }
  }
}
