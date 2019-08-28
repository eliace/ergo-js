import {Html, Domain} from '../../src'
import {Layouts, Tabs} from '../../bulma'

import ModalExample from './modal'
import ToastExample from './toast'
import TransitionsExample from './transitions'
import StatesExample from './states'

export default (projector) => {

  const data = new Domain({
    selected: 'Modal',
  }, {
    properties: {
      modal: (v) => v.selected == 'Modal',
      toast: (v) => v.selected == 'Toast',
      transitions: (v) => v.selected == 'Transitions',
      states: (v) => v.selected == 'States',
    }
  })

  return {
    sources: {
      data,
      tabs: ['Modal', 'Toast', 'Transitions', 'States']
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
        base: Tabs,
        defaultTab: {
          dataChanged: function (v) {
            this.opt('selected', this.opt('text') == v.selected)
          },
          onClick: function (e, {data}) {
            data.set('selected', this.opt('text'))
          },
          tabsChanged: function (v) {
            this.opt('text', v)
          }
        },
        tabsChanged: function (v, k) {
          this.opt('$tabs', k)
        }
      }
    },
    $content: {
//      dynamic: true,
      dataChanged: function (v, k) {
        this.opt('$components', k)
      },
      components: false,
      $modal: ModalExample(),
      $toast: ToastExample(),
      $transitions: TransitionsExample(),
      $states: StatesExample(),
    }
  }
}
