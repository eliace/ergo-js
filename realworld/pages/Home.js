import {Html, Layout, Source} from '../../src'
import dayjs from 'dayjs'

import {getArticles, getTags} from '../effectors'
import {Mutate} from '../utils'
import ColumnsLayout from '../layouts/Columns'
import ArticleItem from '../elements/ArticleItem'
import Nav from '../elements/Nav'


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
        tags: [],
        articles: []
      }
    },
    sourcesBound: function ({page, data}) {

      const selectTag = page.effect('selectTag', this, tag => {
        if (tag != page.get('feed')) {
          page.set('feed', tag)
          data.set('feedTabs', [data.firstOf('feedTabs'), {name: '#'+tag, id: tag}])

          data.loadArticles.ByTag(tag)
        }
      })

      const selectTab = page.effect('selectTab', this, id => {
        if (id != page.get('feed')) {
          page.set('feed', id)
          data.set('feedTabs', [data.firstOf('feedTabs')])

          data.loadArticles.All()
        }
      })

      // методы
      const loadArticles = data.effect('loadArticles', this, async (type, p) => {
        data.set('articles', [])
        const v = await getArticles[type](p)
        data.set('articles', v.articles)
      })
      const loadTags = data.effect('loadTags', this, async () =>{
        data.set('tags', [])
        const v = await getTags()
        data.set('tags', v.tags)
      })

      loadArticles.All = data.effect('loadArticles.All', this, () => loadArticles('All'))
      loadArticles.ByTag = data.effect('loadArticles.ByTag', this, (tag) => loadArticles('ByTag', tag))

      // эффекты
      data.watch(loadArticles.init, this, v => {
        page.set('loadingArticles', true)
      })
      data.watch(loadArticles.done, this, v => {
        page.set('loadingArticles', false)
      })
      data.watch(loadTags.init, this, v => {
        page.set('loadingTags', true)
      })
      data.watch(loadTags.done, this, v => {
        page.set('loadingTags', false)
      })
      data.watch('init', this, () => {
        data.loadArticles.All()
        data.loadTags()
      })

      // data.watch(loadAllArticles.done, this, v => {
      //   data.set('articles', v.articles)
      // })
    },
//     dataMethods: {
// //      loadAllArticles: getArticles.All,
// //      loadArticesByTag: getArticles.ByTag,
// //      loadTags: getTags
//     },
    // pageMethods: {
    //   selectTag: function (tag) {
    //     const {page, data} = this.domain
    //     if (tag != page.get('feed')) {
    //       page.set('feed', tag)
    //       data.set('feedTabs', [data.firstOf('feedTabs'), {name: '#'+tag, id: tag}])
    //
    //       data.loadArticles.ByTag(tag)
    //     }
    //   },
    //   selectTab: function (id) {
    //     const {page, data} = this.domain
    //     if (id != page.get('feed')) {
    //       page.set('feed', id)
    //       data.set('feedTabs', [data.firstOf('feedTabs')])
    //
    //       data.loadArticles.All()
    //     }
    //   }
    // },
    pageEvents: function (e) {
      console.log('page', e)
    },
    dataEvents: function (evt) {
      console.log('data', evt)
      // const {page, data} = this.domain
      // if (evt.name in getArticles.finals) {
      //   data.set('articles', evt.data.articles)
      //   page.set('loadingArticles', false)
      // }
      // else if (evt.name == getArticles.ready) {
      //   data.set('articles', [])
      //   page.set('loadingArticles', true)
      // }
      // else if (evt.name in getTags.finals) {
      //   data.set('tags', evt.data.tags)
      //   page.set('loadingTags', false)
      // }
      // else if (evt.name == getTags.ready) {
      //   data.set('tags', [])
      //   page.set('loadingTags', true)
      // }
      // else if (evt.name == 'init') {
      //   data.loadAllArticles()
      //   data.loadTags()
      // }
    },
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
              },
              onClick: function (e) {
                e.preventDefault()
                this.domain.page.selectTab(this.opt('key'))
              }
            }
          }
        },
        $articles: {
          // FIXME PassThrough Layout
          dataId: 'articles',
          dataChanged: Mutate.Items,
          defaultItem: {
            type: ArticleItem
          },
          pageChanged: Mutate.Components,
          $loadingArticles: {
            as: 'article-preview',
            html: 'div',
            text: 'Loading...'
          },
          dynamic: {
            loadingArticles: true
          }
        },
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
            dataChanged: Mutate.Text,
            onClick: function (e) {
              e.preventDefault()
              this.domain.page.selectTag(this.opt('text'))
            }
          }
        },
        $loadingTags: {
          html: 'span',
          text: 'Loading...'
        },
        pageChanged: function (v, k) {
          this.opt('$components', this.sources[k])
        },
        dynamic: {
          loadingTags: true
        }
      }
    }
  }
}
