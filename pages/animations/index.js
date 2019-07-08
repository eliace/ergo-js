import {Html, Layouts, Tabs, Source} from '../../src'

import ModalExample from './modal'
import ToastExample from './toast'
import TransitionsExample from './transitions'
import StatesExample from './states'

export default (projector) => {

  const Data = new Source({
    selected: 'Modal',
  }, {
    computed: {
      modal: (v) => v.selected == 'Modal',
      toast: (v) => v.selected == 'Toast',
      transitions: (v) => v.selected == 'Transitions',
      states: (v) => v.selected == 'States',
    }
  })

  return {
    sources: {
      data: Data,
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
        type: Tabs,
        defaultTab: {
          dataChanged: function (v) {
            this.opt('selected', this.opt('text') == v.selected)
          },
          onClick: function () {
            this.sources.data.set('selected', this.opt('text'))
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
      $modal: ModalExample(projector),
      $toast: ToastExample(projector),
      $transitions: TransitionsExample(projector),
      $states: StatesExample(),
    }
  }
}
