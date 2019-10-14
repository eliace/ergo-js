import {Html, Domain} from 'ergo-js-core'
import {Layouts, Tabs} from 'ergo-js-bulma'

import ModalExample from './modal'
import ToastExample from './toast'
import StatesExample from './states'
import BasicExample from './basic'

export default () => {

  const data = new Domain({
    selected: 'Basic',
  }, {
    properties: {
      modal: (v) => v.selected == 'Modal',
      toast: (v) => v.selected == 'Toast',
      states: (v) => v.selected == 'States',
      basic: (v) => v.selected == 'Basic',
    }
  })

  return {
    sources: {
      data,
      tabs: ['Basic', 'Modal', 'Toast', 'States']
    },
    layout: Layouts.Rows,
    $header: {
      $title: {
        layout: Layouts.Content,
        $content: {
          html: 'h3'
        },
        text: 'Animations'
      },
      $tabs: {
        as: Tabs,
        defaultTab: {
            sources: {
              __state: (o, ctx) => ctx.data
            },
            tabsChanged: function (v) {
              this.opt('text', v)
            }
        },
        // defaultTab: {
        //   dataChanged: function (v) {
        //     this.opt('selected', this.opt('text') == v.selected)
        //   },
        //   onClick: function (e, {data}) {
        //     data.set('selected', this.opt('text'))
        //   },
        //   tabsChanged: function (v) {
        //     this.opt('text', v)
        //   }
        // },
        tabsChanged: function (v, k) {
          this.opt('tabs', k)
        }
      }
    },
    $content: {
//      dynamic: true,
      dataChanged: function (v, s) {
        this.opt('components', s)
      },
      components: false,
      $basic: BasicExample,
      $modal: ModalExample,
      $toast: ToastExample,
      $states: StatesExample,
    }
  }
}
