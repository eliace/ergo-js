import {Html, Layout, Source} from '../../src'
import {Mutate} from '../utils'
import ColumnsLayout from '../layouts/Columns'
import PassThroughLayout from '../layouts/PassThrough'
import Nav from '../elements/Nav'
import ArticleItem from '../elements/ArticleItem'
import {getArticles} from '../effectors'


export default () => {
  return {
    sources: {
      selection: {
        currentTab: 'my'
      }
    },
    dataMethods: {
      loadMyArticles: getArticles.ByAuthor,
      loadFavoritedArticles: getArticles.Favorited
    },
    dataEvents: function (evt) {
      const {page, data} = this.domain
      if (evt.name == 'init') {
        data.loadMyArticles(data.get('username'))
      }
      else if (evt.name == getArticles.ready) {
        data.set('articles', null)
        page.set('loadingArticles', true)
      }
      else if (evt.name == getArticles.done) {
        data.set('articles', evt.data.articles)
        page.set('loadingArticles', false)
      }
    },
    dataChanged: function (v) {
      this.domain.page.set('noArticles', v.articles && v.articles.length == 0)
    },
    selectionMethods: {
      selectTab: function (key) {
        const {data, selection} = this.domain
        selection.set('currentTab', key)
        if (key == 'my') {
          data.loadMyArticles(data.get('username'))
        }
        else if (key == 'favorited') {
          data.loadFavoritedArticles(data.get('username'))
        }
      }
    },
    pageComputed: {
      followBtn: v => !(v.user && v.username == v.user.username),
      settingsBtn: v => v.user && v.username == v.user.username
    },
    as: 'profile-page',
    $userInfo: {
      as: 'user-info',
      $content: {
        as: 'container',
        layout: ColumnsLayout,
        $content: {
          layout: PassThroughLayout,
          col: 'col-xs-12 col-md-10 offset-md-1',
          $avatar: {
            html: 'img',
            as: 'user-img',
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
            as: 'btn btn-sm btn-outline-secondary action-btn',
            $icon: {
              html: 'i',
              as: 'ion-plus-round'
            },
            dataChanged: function (v) {
              this.opt('text', ' Follow ' + v.username)
            }
          },
          $settingsBtn: {
            html: 'a',
            as: 'btn btn-sm btn-outline-secondary action-btn',
            $icon: {
              html: 'i',
              as: 'ion-gear-a'
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
      as: 'container',
      layout: ColumnsLayout,
      $content: {
        col: 'col-xs-12 col-md-10 offset-md-1',
        $articlesToggle: {
          as: 'articles-toggle',
          $nav: {
            type: Nav,
            as: 'nav-pills outline-active',
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
          type: ArticleItem
        },
        dataId: 'articles',
        dataChanged: Mutate.Items,
        pageChanged: Mutate.Components,
        $loadingArticles: {
          as: 'article-preview',
          html: 'div',
          text: 'Loading...'
        },
        $noArticles: {
          as: 'article-preview',
          html: 'div',
          text: 'No articles are here... yet.'
        },
        dynamic: {
          loadingArticles: true,
          noArticles: true
        }
      }
    }
  }
}
