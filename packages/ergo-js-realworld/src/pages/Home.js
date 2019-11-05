import {Html, Layout, Source, Domain, Effect} from 'ergo-js-core'
import dayjs from 'dayjs'

//import {getArticles, getTags} from '../effectors'
import {getAllArticles, getTags, getArticlesByTag} from '../api'

import {Mutate} from '../utils'
import ColumnsLayout from '../layouts/Columns'
import ArticleItem from '../elements/ArticleItem'
import Nav from '../elements/Nav'


class CancelableEffect extends Effect {
  constructor (name, promise, options, owner) {
    super(name, promise, {...options, channels: ['cancel']}, owner)
  }

  cancelResolver (e) {
    console.log('Canceling')
    this.finalize('cancel')
    this.reject('cancel')
  }


  // resolveCollisions (collisions) {
  //   console.log('cancel')
  //   collisions.forEach(c => c.finalize('cancel'))
  // }
}


export default () => {
  return {
    // SCOPE
    scope: {
      view: () => new Domain({
        feedTabs: [{
          name: 'Global Feed',
          id: 'global'
        }],
        feed: 'global'
      }, {
        properties: {
          feed: String,
          feedTabs: Array,
          isLoadingArticles: Boolean
        }
      }),
      data: function () {
        return new Domain({
          tags: [],
          articles: []
        }, {
          actions: {
            loadAllArticles: async function () {
              this.$set('articles', [])
              const v = await getAllArticles()
              this.$set('articles', v.articles)
            },
            loadTags: async function () {
              this.$set('tags', [])
              const v = await getTags()
              this.$set('tags', v.tags)
            },
            loadArticlesByTag: async function (tag) {
              this.set('articles', [])
              const v = await getArticlesByTag(tag)
              this.set('articles', v.articles)
            }
          }
        })
      }
    },
    allJoined: function ({view, data}) {
      const {loadAllArticles, loadTags, loadArticlesByTag} = data

      view.createAction('selectTag', (tag) => {
        if (tag != view.feed) {
          view.feed = tag
          view.feedTabs = [view.feedTabs[0], {name: '#'+tag, id: tag}]
          loadArticlesByTag(tag)
        }
      }, this)
      view.createAction('selectTab', (id) => {
        if (id != view.feed) {
          view.feed = id
          view.feedTabs = [view.feedTabs[0]]
//          data.set('feedTabs', [data.$firstOf('feedTabs')])
          loadAllArticles()
        }
      }, this)

      view.$on('init', () => {
        loadAllArticles()
        loadTags()
      }, this)

      const delay = view.createAction('delay', (t) => {
        let cancel = null
        const promise = new Promise((resolve, reject) => {
          cancel = reject
          setTimeout(() => {
            resolve()
          }, t)
        })
        return promise
//        return new Effect('delay', promise, {cancel}, view)
      }, this, {effect: CancelableEffect})

      view.$watch(() => true, (e) => {
        console.log(e)
      })

      // function delay (t) {
      //   const promise = new Promise((resolve, reject) => {
      //     setTimeout(() => {
      //       resolve()
      //     }, t)
      //   })
      //   return new Effect('delay', promise)
      // }

      data.$on(loadAllArticles.start, async () => {
        await delay(3000)
        view.isLoadingArticles = true
      }, this)
      data.$on(loadAllArticles.done, () => {
        delay.cancel()
//        console.log(view.subscribers.filter(s => s instanceof Effect))
//         view.subscribers.filter(s => s.name == 'delay' && s instanceof Effect).forEach(eff => {
//           console.log('cancel', eff.options)
//           if (eff.options.cancel) {
//             eff.options.cancel('Cancel')
//           }
// //          eff.options.cancel()//.finalize('cancel')
//         })
        // view.$emit(delay.on, null, null, 'cancel')
        // console.log(view.subscribers.filter(s => s instanceof Effect))
        view.isLoadingArticles = false
      }, this)

      // data.$watch(e => (e.name == loadAllArticles.on || e.name == loadArticlesByTag.on) && e.channel == 'start', (e) => {
      //   view.isLoadingArticles = true
      // })
      // data.$watch(e => (e.name == loadAllArticles.on || e.name == loadArticlesByTag.on) && e.channel == 'done', (e) => {
      //   view.isLoadingArticles = false
      // })



      // data.$watch(e => e.name == loadAllArticles.on || e.name == loadArticlesByTag.on, this, e => {
      //   page.set('loadingArticles', true)
      // })
      // data.$watch(e => e.name == loadAllArticles.done || e.name == loadArticlesByTag.done, this, e => {
      //   page.set('loadingArticles', false)
      // })
      // data.$watch(loadTags.on, this, e => {
      //   page.set('loadingTags', true)
      // })
      // data.$watch(loadTags.done, this, e => {
      //   page.set('loadingTags', false)
      // })
    },
    // TEMPLATE
    css: 'home-page',
    $banner: {
      css: 'banner',
      $container: {
        css: 'container',
        $title: {
          html: 'h1',
          css: 'logo-font',
          text: 'conduit'
        },
        $subtitle: {
          html: 'p',
          text: 'A place to share your knowledge.'
        }
      }
    },
    $content: {
      css: 'container page',
      layout: ColumnsLayout,
      $content: {
        col: 'col-md-9',
        $feedToggle: {
          css: 'feed-toggle',
          $nav: {
            scope: {
              data: ctx => ctx.view.$entry('feedTabs')
            },
            as: Nav,
            css: 'nav-pills outline-active',
//            viewId: 'feedTabs',
//            items: stream('data:feedTabs'),
            dataChanged: function (v, s) {
              this.opt('items', s.$iterator())
            },
            defaultItem: {
//              active: value('data', (v) => v.feed == this.options.key),
              dataChanged: function (v) {
                this.opt('text', v.name)
                this.opt('key', v.id)
              },
              viewChanged: function (v) {
                this.opt('active', v.feed == this.opt('key'))
              },
              onClick: function (e, {view}) {
                e.preventDefault()
                view.selectTab(this.opt('key'))
              }
            }
          }
        },
        $articles: {
          // FIXME PassThrough Layout
          dataId: 'articles',
          dataChanged: function (v, s) {
            this.opt('items', s.$iterator())
          },
          defaultItem: {
            as: ArticleItem
          },
          viewChanged: function (v, s) {
            this.opt('components', {loadingArticles: s.isLoadingArticles})
          },
          $loadingArticles: {
            css: 'article-preview',
            html: 'div',
            text: 'Loading...'
          }
        },
      },
      $sidebar: {
        col: 'col-md-3',
        css: 'sidebar',
        $title: {
          html: 'p',
          text: 'Popular Tags'
        },
        $tags: {
          css: 'tag-list',
          dataId: 'tags',
          dataChanged: function (v, s) {
            this.opt('items', s.$iterator())
          },
          defaultItem: {
            html: 'a',
            css: 'tag-pill tag-default',
            href: '',
            dataChanged: Mutate.Text,
            onClick: function (e, {view, data}) {
              e.preventDefault()
              view.selectTag(data.$value)
            }
          }
        },
        $loadingTags: {
          html: 'span',
          text: 'Loading...'
        },
        viewChanged: function (v, s) {
          this.opt('components', s)
        },
      }
    }
  }
}
