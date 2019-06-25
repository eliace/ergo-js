import {Html, Layout, Source} from '../../src'
import dayjs from 'dayjs'

import {getArticles, getTags} from '../effectors'
import {Mutate} from '../utils'
import ColumnsLayout from '../layouts/Columns'
import ArticleView from '../elements/ArticleView'
import Nav from '../elements/Nav'




export default () => {
  return {
    sources: {
      data: {}
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
            items: [{
              text: 'Your Feed',
              disabled: true
            }, {
              text: 'Global Feed',
              active: true
            }]
          }
        },
        $articles: {
          // FIXME PassThrough Layout
          dataId: 'articles',
          dataChanged: Mutate.Items,
          // TODO этот эффектор должен быть уровня модели
          dataEffectors: {
            loadArticles: getArticles()
          },
          defaultItem: {
            type: ArticleView
          }
        }
      },
      $sidebar: {
        col: 'md-3',
        as: 'sidebar',
        $title: {
          html: 'p',
          text: 'Popular Tags'
        },
        $tags: {
          as: 'tag-list',
          dataId: 'tags',
          dataEffectors: {
            loadTags: getTags()
          },
          dataChanged: Mutate.Items,
          defaultItem: {
            html: 'a',
            as: 'tag-pill tag-default',
            href: '',
            dataChanged: Mutate.Text
          }
        }
      }
    }
  }
}
