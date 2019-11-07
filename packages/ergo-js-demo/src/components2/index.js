import {Html, Domain} from 'chorda-core'
import {Layouts, Tabs} from 'chorda-bulma'

import DropdownExample from './dropdown'
import ToastExample from './toast'
import ListExample from './list'
import CarouselExample from './carousel'
import LoaderExample from './loader'
import OverlayExample from './overlay'
import AlertExample from './alert'


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

const DropdownCode = ''//fs.readFileSync(__dirname+'/dropdown.js', 'utf-8')
const ToastCode = ''//fs.readFileSync(__dirname+'/toast.js', 'utf-8')
const ListCode = ''//fs.readFileSync(__dirname+'/list.js', 'utf-8')
import CarouselCode from 'raw-loader!./carousel'//fs.readFileSync(__dirname+'/carousel.js', 'utf-8')
import LoaderCode from 'raw-loader!./loader'
import OverlayCode from 'raw-loader!./overlay'


export default () => {

  const data = new Domain({
    selected: 'Dropdown'
  }, {
    properties: {
      dropdown: (v) => v.selected == 'Dropdown',
      toast: v => v.selected == 'Toast',
      list: v => v.selected == 'List',
      carousel: v => v.selected == 'Carousel',
//      loader: v => v.selected == 'Loader',
      overlay: v => v.selected == 'Overlay',
      alert: v => v.selected == 'Alert',
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
        text: 'Components+'
      },
      $tabs: {
        as: Tabs,
        level: Layouts.Level.RIGHT,
        sources: {
          __state: (ctx, o) => ctx.data
        },
        tabs: [
          {text: 'Dropdown'},
          {text: 'Toast'},
          {text: 'List'},
          {text: 'Carousel'},
//          {text: 'Loader'},
          {text: 'Overlay'},
          {text: 'Alert'},
        ]
      }
    },
    $content: {
      components: false,
      dataChanged: function (v, s) {
        this.opt('components', s.$iterator())
      },
      $dropdown: previewOf(DropdownExample, DropdownCode),
      $toast: previewOf(ToastExample, ToastCode),
      $list: ListExample,//previewOf(ListExample, ListCode),
      $carousel: previewOf(CarouselExample, CarouselCode),
//      $loader: previewOf(LoaderExample, LoaderCode),
      $overlay: previewOf(OverlayExample, OverlayCode),
      $alert: AlertExample,
    }
  }
}
