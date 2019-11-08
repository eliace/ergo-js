import {Html, Layout, Source, Domain, Effect} from 'chorda-core'
import dayjs from 'dayjs'

//import {getArticles, getTags} from '../effectors'
import {getAllArticles, getTags, getArticlesByTag} from '../api'

import {Mutate} from '../utils'
import ColumnsLayout from '../layouts/Columns'
import ArticleItem from '../elements/ArticleItem'
import Nav from '../elements/Nav'


// class CancelableEffect extends Effect {
//   constructor (name, promise, options, owner) {
//     super(name, promise, {...options, channels: ['cancel']}, owner)
//   }

//   cancelResolver (e) {
//     console.log('Canceling')
//     this.finalize('cancel')
//     this.reject('cancel')
//   }


//   // resolveCollisions (collisions) {
//   //   console.log('cancel')
//   //   collisions.forEach(c => c.finalize('cancel'))
//   // }
// }


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
          isLoadingArticles: Boolean,
          isLoadingTags: Boolean
        }
      }),
      data: () => new Domain({
        tags: [],
        articles: []
      }, {
        properties: {
          articles: Array,
          tags: Array
        },
        actions: {
          loadAllArticles: async function () {
            this.articles = []
            const v = await getAllArticles()
            this.articles = v.articles
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
    },
    allJoined: function ({view, data}) {
      const {loadAllArticles, loadTags, loadArticlesByTag} = data

      view.createAction('selectTag', (tag) => {
        if (tag != view.feed) {
          view.feed = tag
          view.feedTabs = [view.feedTabs[0], {name: '#'+tag, id: tag}]
          loadArticlesByTag(tag)
        }
      })
      view.createAction('selectTab', (id) => {
        if (id != view.feed) {
          view.feed = id
          view.feedTabs = [view.feedTabs[0]]
//          data.set('feedTabs', [data.$firstOf('feedTabs')])
          loadAllArticles()
        }
      })

      view.$on('init', () => {
        loadAllArticles()
        loadTags()
      })

      data.$on([loadAllArticles.start, loadArticlesByTag.start], () => {
        view.isLoadingArticles = true
      })
      data.$on([loadAllArticles.done, loadArticlesByTag.done], () => {
        view.isLoadingArticles = false
      })

      data.$on(loadTags.start, () => {
        view.isLoadingTags = true
      })
      data.$on(loadTags.done, () => {
        view.isLoadingTags = false
      })

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
              data: ctx => ctx.view.$at('feedTabs')
            },
            as: Nav,
            css: 'nav-pills outline-active',
//            viewId: 'feedTabs',
//            items: stream('data:feedTabs'),
            dataChanged: function (v, s) {
              this.opt('items', s.$all())
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
          scope: {
            data: ctx => ctx.data.$at('articles')
          },
          // FIXME PassThrough Layout
//          dataId: 'articles',
          dataChanged: function (v, s) {
            this.opt('items', s.$all())
          },
          defaultItem: {
            as: ArticleItem
          },
          viewChanged: function (v, s) {
            this.opt('components', {loading: s.isLoadingArticles})
          },
          $loading: {
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
          scope: {
            data: ctx => ctx.data.$at('tags')
          },
          css: 'tag-list',
//          dataId: 'tags',
          dataChanged: function (v, s) {
            this.opt('items', s.$all())
          },
          defaultItem: {
            html: 'a',
            css: 'tag-pill tag-default',
            href: '',
            dataChanged: function (v) {
              this.opt('text', v)
            },
            onClick: function (e, {view, data}) {
              e.preventDefault()
              view.selectTag(data.$value)
            }
          }
        },
        $loading: {
          html: 'span',
          text: 'Loading...'
        },
        viewChanged: function (v, s) {
          this.opt('components', {loading: s.isLoadingTags})
        },
      }
    }
  }
}
