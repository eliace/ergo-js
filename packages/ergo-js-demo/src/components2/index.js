import {Html, Domain} from 'ergo-js-core'
import {Layouts, Tabs} from 'ergo-js-bulma'

import DropdownExample from './dropdown'
import ToastExample from './toast'
import ListExample from './list'
import CarouselExample from './carousel'

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
const CarouselCode = ''//fs.readFileSync(__dirname+'/carousel.js', 'utf-8')


export default () => {

  const data = new Domain({
    selected: 'Dropdown'
  }, {
    properties: {
      dropdown: (v) => v.selected == 'Dropdown',
      toast: v => v.selected == 'Toast',
      list: v => v.selected == 'List',
      carousel: v => v.selected == 'Carousel',
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
          __state: (o, ctx) => ctx.data
        },
        tabs: [
          {text: 'Dropdown'},
          {text: 'Toast'},
          {text: 'List'},
          {text: 'Carousel'},
        ]
      }
    },
    $content: {
      components: false,
      dataChanged: function (v, stream) {
        this.opt('components', stream)
      },
      $dropdown: previewOf(DropdownExample, DropdownCode),
      $toast: previewOf(ToastExample, ToastCode),
      $list: previewOf(ListExample, ListCode),
      $carousel: previewOf(CarouselExample, CarouselCode),
    }
  }
}
