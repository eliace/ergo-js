import {Html, Domain} from '../../src'
import {Layouts, Tabs} from '../../bulma'

import BasicExample from './basic'

import {PreviewAndCode} from '../extensions'

import fs from 'fs'

function previewOf (exampleCreator, code) {
  return {
    as: PreviewAndCode,
    $preview: exampleCreator(),
    $code: {
      text: code
    }
  }
}

const BasicCode = fs.readFileSync(__dirname+'/basic.js', 'utf-8')


export default () => {

  const page = new Domain({
    selected: 'Basic'
  }, {
    properties: {
      basic: {
        calc: v => v.selected == 'Basic'
      },
      selected: {}
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
        sources: {
          __state: (o, ctx) => ctx.page,
          data: (o, ctx) => ctx.data.$entry('tabs')
        },
        as: Tabs,
        defaultTab: {
          // pageChanged: function (v) {
          //   this.opt('selected', this.opt('text') == v.selected)
          // },
          dataChanged: function (v) {
            this.opt('text', v)
          },
          // onClick: function (e, {data}) {
          //   page.set('selected', this.options.text)
          // }
        },
        dataChanged: function (v, s) {
          this.opt('tabs', s)//d.$entry('tabs').$stream(k))
        }
//        tabs: ['Basic']
      }
    },
    $content: {
      components: false,
      pageChanged: function (v, src) {
        this.opt('components', src)
      },
      $basic: previewOf(BasicExample, BasicCode),
    }
  }
}