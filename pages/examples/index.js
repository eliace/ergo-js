import {Html, Layouts, Tabs, Source} from '../../src'

import DomainExample from './domain'
import MultidomainExample from './multidomain'

export default (projector) => {

  const Data = new Source({
    selected: 'Domain',
  }, {
    computed: {
      domain: (v) => v.selected == 'Domain',
      multidomain: (v) => v.selected == 'Multidomain',
    }
  })

  return {
    sources: {
      data: Data,
      tabs: ['Domain', 'Multidomain']
    },
    layout: Layouts.Rows,
    $header: {
      $title: {
        layout: Layouts.Content,
        $content: {
          html: 'h3'
        },
        text: 'Examples'
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
      dynamic: true,
      dataChanged: function (v, k) {
        this.opt('$components', k)
      },
      $domain: DomainExample(projector),
      $multidomain: MultidomainExample(projector),
    }
  }
}