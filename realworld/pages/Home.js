import {Html, Layout, Source} from '../../src'
import dayjs from 'dayjs'

import {getArticles, getTags, _getArticles} from '../effectors'
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
        tags: [],
        articles: []
      }
    },
    dataMethods: {
      loadAllArticles: getArticles.All,
      loadArticesByTag: getArticles.ByTag,
      loadTags: getTags
    },
    pageMethods: {
      selectTag: function (tag, target) {
        const {page, data} = target.domain
        page.set('feed', tag)
        data.set('feedTabs', [data.firstOf('feedTabs'), {name: '#'+tag, id: tag}])

        data.loadArticesByTag(tag)
        // this.emit(getArticles.ByTag.ready)
        // getArticles.ByTag(tag)
        //   .then(json => {
        //     this.emit(getArticles.ByTag.done, {data: json.articles})
        //   })
      },
      selectTab: function (id, target) {
        const {page, data} = target.domain
        page.set('feed', id)
        data.set('feedTabs', [data.firstOf('feedTabs')])

        data.loadAllArticles()
      }
    },
    dataEvents: function (evt) {
      console.log(evt)
      const {page, data} = this.domain
      if (evt.name in getArticles.finals) {
        data.set('articles', evt.data.articles)
        page.set('loadingArticles', false)
      }
      else if (evt.name == getArticles.ready) {
        data.set('articles', [])
        page.set('loadingArticles', true)
      }
      else if (evt.name in getTags.finals) {
        data.set('tags', evt.data.tags)
        page.set('loadingTags', false)
      }
      else if (evt.name == getTags.ready) {
        data.set('tags', [])
        page.set('loadingTags', true)
      }
      else if (evt.name == 'init') {
        data.loadAllArticles()
        data.loadTags()
        // page.emit(getArticles.All.ready)
        // getArticles.All()
        //   .then(json => {
        //     page.emit(getArticles.All.done, {data: json.articles})
        //   })
        // data.emit(getTags.ready)
        // getTags()
        //   .then(json => {
        //     data.emit(getTags.done, {data: json.tags})
        //   })
      }
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
            type: ArticleView
          },
          pageChanged: function (v, k) {
            this.opt('$components', this.sources[k])
          },
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
