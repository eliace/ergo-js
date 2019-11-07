import {Html, Domain} from 'chorda-core'
import {Layouts, Tabs} from 'chorda-bulma'

import DomainExample from './domain'
import MultidomainExample from './multidomain'
import PostsExample from './posts'
import CountriesExample from './countries'
import CatsExample from './cats'
import Cats2Example from './cats2'
import PerformanceExample from './performance-calendar'
import FeedExample from './feed'
import ValidationExample from './validation'

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
      cats2: (v) => v.selected == 'Cats2',
      performance: (v) => v.selected == 'Performance',
      feed: (v) => v.selected == 'Feed',
      validation: (v) => v.selected == 'Validation',
    }
  })

  return {
    sources: {
      page,
      tabs: ['Domain', 'Multidomain', 'Posts', 'Countries', 'Cats', 'Cats2', 'Performance', 'Feed', 'Validation']
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
          sources: {
            __state: (ctx, o) => ctx.page
          },
          // pageChanged: function (v) {
          //   this.opt('selected', this.opt('text') == v.selected)
          // },
          // onClick: function (e, {page}) {
          //   page.set('selected', this.opt('text'))
          // },
          tabsChanged: function (v) {
            this.opt('text', v)
          }
        },
        tabsChanged: function (v, s, k) {
          this.opt('tabs', s.$iterator(k))
        }
      }
    },
    $content: {
      components: false,
      pageChanged: function (v, s, k) {
        this.opt('components', s.$iterator(k))
      },
      $domain: DomainExample,
      $multidomain: MultidomainExample,
      $posts: PostsExample,
      $countries: CountriesExample,
      $cats: CatsExample,
      $cats2: Cats2Example,
      $performance: PerformanceExample,
      $feed: FeedExample,
      $validation: ValidationExample,
    }
  }
}
