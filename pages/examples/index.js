import {Html, Domain} from '../../src'
import {Layouts, Tabs} from '../../bulma'

import DomainExample from './domain'
import MultidomainExample from './multidomain'
import PostsExample from './posts'
import CountriesExample from './countries'
import CatsExample from './cats'

export default () => {

  const page = new Domain({
    selected: 'Domain',
  }, {
    properties: {
      domain: (v) => v.selected == 'Domain',
      multidomain: (v) => v.selected == 'Multidomain',
      posts: (v) => v.selected == 'Posts',
      countries: (v) => v.selected == 'Countries',
      cats: (v) => v.selected == 'Cats',
    }
  })

  return {
    sources: {
      page,
      tabs: ['Domain', 'Multidomain', 'Posts', 'Countries', 'Cats']
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
        as: Tabs,
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
          this.opt('tabs', k)
        }
      }
    },
    $content: {
      components: false,
      pageChanged: function (v, k, src) {
        this.opt('components', src.$stream(k))
      },
      $domain: DomainExample(),
      $multidomain: MultidomainExample(),
      $posts: PostsExample(),
      $countries: CountriesExample(),
      $cats: CatsExample(),
    }
  }
}
