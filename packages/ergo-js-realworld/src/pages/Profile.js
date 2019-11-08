import {Html, Layout, Source} from '../../src'
import {Mutate} from '../utils'
import ColumnsLayout from '../layouts/Columns'
import Nav from '../elements/Nav'
import ArticleItem from '../elements/ArticleItem'
import {getArticles} from '../effectors'


export default () => {

  // const _data = {
  //   effectors: {
  //     loadArticles: {
  //       My: function () {
  //         return this.loadArticles('ByAuthor', this.get('username'))
  //       },
  //       Favorited: () => {
  //
  //       },
  //       Any: async function (type, p) {
  //         this.set('articles', [])
  //         const v = await getArticles[type](p)
  //         this.set('articles', v.articles)
  //       }
  //     }
  //   },
  //   computors: {
  //     followBtn: v => !v.user
  //   },
  //   watchers: {
  //     beforeLoading: {
  //       when: e => e.name = e.domain.loadArticles.init,
  //       call: e => {
  //         return this.resolve('beforeLoading')
  //         // const {page} = e.target.domains
  //         // page.set('loadingArticles', true)
  //         // page.set('noArticles', false)
  //       }
  //     },
  //     afterLoading: {
  //       when: e => e.name = e.domain.loadArticles.done,
  //       call: e => {
  //         // const {page} = e.target.domains
  //         // page.set('loadingArticles', true)
  //         // page.set('noArticles', false)
  //       }
  //     }
  //   }
  // }

  return {
    sources: {
      selection: {
        currentTab: 'my'
      }
    },
    dataId: 'profile',
    sourcesBound: function ({data, page, selection}) {

      const loadArticles = data.effect('loadArticles', this, async (type, p) => {
        data.set('articles', [])
        const v = await getArticles[type](p)
        data.set('articles', v.articles)
      })
      loadArticles.My = data.effect('loadMyArticles', this, () => {
        return loadArticles('ByAuthor', data.get('username'))
      })
      loadArticles.Favorited = data.effect('loadFavoritedArticles', this, () => {
        return loadArticles('Favorited', data.get('username'))
      })
      const selectTab = selection.effect('selectTab', this, (key) => {
        selection.set('currentTab', key)
      })

      const reloadArticles = () => {
//        selectTab(selection.get('currentTab'))
        const key = selection.get('currentTab')
        if (key == 'my') {
          loadArticles.My()
        }
        else if (key == 'favorited') {
          loadArticles.Favorited()
        }
      }

      page.computed('followBtn', this, v => !(v.user && v.username == v.user.username))
      page.computed('settingsBtn', this, v => v.user && v.username == v.user.username)

      data.watch(loadArticles.init, this, () => {
        page.set('loadingArticles', true)
        page.set('noArticles', false)
      })
      data.watch(loadArticles.done, this, () => {
        page.set('loadingArticles', false)
        page.set('noArticles', data.entry('articles').isEmpty())
      })
      data.watch(e => e.name == 'init' && e.target == this, this, reloadArticles)
      selection.watch(selectTab.done, this, reloadArticles)

      // data.watch('@loadProfile:done', this, (e) => {
      //   console.log('profile reloaded')
      // })

    },
    selectionEvents: function (e) {
      console.log('[profile] selection', e)
    },
    dataEvents: function (e) {
      console.log('[profile] data', e)
    },

    css: 'profile-page',
    $userInfo: {
      css: 'user-info',
      $content: {
        css: 'container',
        layout: ColumnsLayout,
        $content: {
          layout: Layout.passthru,
          col: 'col-xs-12 col-md-10 offset-md-1',
          $avatar: {
            html: 'img',
            css: 'user-img',
            dataChanged: function (v) {
              this.opt('src', v.image)
            }
          },
          $name: {
            html: 'h4',
            dataChanged: function (v) {
              this.opt('text', v.username)
            }
          },
          $bio: {
            html: 'p',
            dataChanged: function (v) {
              this.opt('text', v.bio)
            }
          },
          $followBtn: {
            html: 'button',
            css: 'btn btn-sm btn-outline-secondary action-btn',
            $icon: {
              html: 'i',
              css: 'ion-plus-round'
            },
            dataChanged: function (v) {
              this.opt('text', ' Follow ' + v.username)
            }
          },
          $settingsBtn: {
            html: 'a',
            css: 'btn btn-sm btn-outline-secondary action-btn',
            $icon: {
              html: 'i',
              css: 'ion-gear-a'
            },
            text: ' Edit profile settings',
            href: '/#/settings'
          },
          dynamic: {
            followBtn: true,
            settingsBtn: true
          },
          pageChanged: Mutate.Components
        }
      }
    },
    $content: {
      css: 'container',
      layout: ColumnsLayout,
      $content: {
        col: 'col-xs-12 col-md-10 offset-md-1',
        $articlesToggle: {
          css: 'articles-toggle',
          $nav: {
            as: Nav,
            css: 'nav-pills outline-active',
            defaultItem: {
              selectionChanged: function (v) {
                this.opt('active', v.currentTab == this.opt('key'))
              },
              onClick: function (e) {
                e.preventDefault()
                this.domain.selection.selectTab(this.opt('key'))
              }
            },
            items: [{
              text: 'My Articles',
              key: 'my'
            }, {
              text: 'Favorited Articles',
              key: 'favorited'
            }]
          }
        },
        defaultItem: {
          as: ArticleItem
        },
        dataId: 'articles',
        dataChanged: Mutate.Items,
        pageChanged: Mutate.Components,
        $loadingArticles: {
          css: 'article-preview',
          html: 'div',
          text: 'Loading...'
        },
        $noArticles: {
          css: 'article-preview',
          html: 'div',
          text: 'No articles are here... yet.'
        },
        components: {
          articlesToggle: true
        }
      }
    }
  }
}
