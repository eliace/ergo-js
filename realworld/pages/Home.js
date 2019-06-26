import {Html, Layout, Source} from '../../src'
import dayjs from 'dayjs'

import {getArticles, getTags} from '../effectors'
import {Mutate} from '../utils'
import ColumnsLayout from '../layouts/Columns'
import ArticleView from '../elements/ArticleView'
import Nav from '../elements/Nav'


// const f = getTags
//   .wait(evt => evt.name == 'init')
//   // .done(v => {
//   //   this.sources.data.set('tags', v.tags)
//   // })
//
// console.log(f)



export default () => {
  return {
    sources: {
      page: {
        feed: 'global',
      },
      data: {
        feedTabs: [{
          name: 'Global Feed',
          id: 'global'
        }],
        tags: []
      }
    },
    dataEffectors: {
      loadTags: getTags
        .when(evt => evt.name == 'init')
        .ready(function () {
          this.domain.page.set('loadingTags', true)
        })
        .done(function (json) {
          this.domain.data.set('tags', json.tags)
          this.domain.page.set('loadingTags', false)
        }),
      loadArticles: getArticles
        .when(e => e.name == 'init')
        .ready(function () {
          this.domain.page.set('loadingArticles', true)
        })
        .done(function (json) {
          this.domain.data.set('articles', json.articles)
          this.domain.page.set('loadingArticles', false)
        }),
    },
    // sources: {
    //   data: new Domain({
    //     articles: []
    //   }, {
    //     effectors: {
    //       fetchListArticles: listArticles()
    //     }
    //   })
    // },
    as: 'home-page',
    $banner: {
      as: 'banner',
      $container: {
        as: 'container',
        $title: {
          html: 'h1',
          as: 'logo-font',
          text: 'conduit'
        },
        $subtitle: {
          html: 'p',
          text: 'A place to share your knowledge.'
        }
      }
    },
    $content: {
      as: 'container page',
      layout: ColumnsLayout,
      $content: {
        col: 'col-md-9',
        $feedToggle: {
          as: 'feed-toggle',
          $nav: {
            type: Nav,
            as: 'nav-pills outline-active',
            dataId: 'feedTabs',
//            items: stream('data:feedTabs'),
            dataChanged: function (v, k) {
              this.opt('$items', this.sources[k].asStream(k))
            },
            defaultItem: {
//              active: value('data', (v) => v.feed == this.options.key),
              dataChanged: function (v) {
                this.opt('text', v.name)
                this.opt('key', v.id)
              },
              pageChanged: function (v) {
                this.opt('active', v.feed == this.opt('key'))
              }
            }
          }
        },
        $articles: {
          // FIXME PassThrough Layout
          dataId: 'articles',
          dataChanged: Mutate.Items,
          defaultItem: {
            type: ArticleView
          }
        },
        pageChanged: function (v, k) {
          this.opt('$components', this.sources[k])
        },
        dynamic: {
          loadingArticles: {
            html: 'span',
            text: 'Loading...'
          }
        }
      },
      $sidebar: {
        col: 'col-md-3',
        as: 'sidebar',
        $title: {
          html: 'p',
          text: 'Popular Tags'
        },
        $tags: {
          as: 'tag-list',
          dataId: 'tags',
          dataChanged: function (v, k) {
            this.opt('items', this.sources[k].asStream(k))
          },
          defaultItem: {
            html: 'a',
            as: 'tag-pill tag-default',
            href: '',
            dataChanged: Mutate.Text
          }
        },
        pageChanged: function (v, k) {
          this.opt('$components', this.sources[k])
        },
        dynamic: {
          loadingTags: {
            html: 'span',
            text: 'Loading...'
          }
        }
      }
    }
  }
}
