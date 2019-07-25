import {Html, Domain} from '../../src'
import {Layouts, Tabs} from '../../bulma'

import DomainExample from './domain'
import MultidomainExample from './multidomain'
import PostsExample from './posts'
import CountriesExample from './countries'

export default () => {

  const page = new Domain({
    selected: 'Domain',
  }, {
    computed: {
      domain: (v) => v.selected == 'Domain',
      multidomain: (v) => v.selected == 'Multidomain',
      posts: (v) => v.selected == 'Posts',
      countries: (v) => v.selected == 'Countries',
    }
  })

  return {
    sources: {
      page,
      tabs: ['Domain', 'Multidomain', 'Posts', 'Countries']
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
          pageChanged: function (v) {
            this.opt('selected', this.opt('text') == v.selected)
          },
          onClick: function (e, {page}) {
            page.set('selected', this.opt('text'))
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
      components: false,
      pageChanged: function (v, k) {
        this.opt('$components', k)
      },
      $domain: DomainExample(),
      $multidomain: MultidomainExample(),
      $posts: PostsExample(),
      $countries: CountriesExample(),
    }
  }
}
