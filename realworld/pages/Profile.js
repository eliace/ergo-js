import {Html, Layout, Source} from '../../src'
import {Mutate} from '../utils'
import ColumnsLayout from '../layouts/Columns'
import PassThroughLayout from '../layouts/PassThrough'
import Nav from '../elements/Nav'
import ArticleView from '../elements/ArticleView'


export default () => {
  return {
    sources: {
      data: {
        articles: [{
          author: {},
          title: 'Hello'
        }]
      }
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
            src: 'http://i.imgur.com/Qr71crq.jpg'
          },
          $name: {
            html: 'h4',
            text: 'Eric Simons'
          },
          $bio: {
            html: 'p',
            text: 'Cofounder @GoThinkster, lived in Aol\'s HQ for a few months, kinda looks like Peeta from the Hunger Games'
          },
          $followBtn: {
            html: 'button',
            as: 'btn btn-sm btn-outline-secondary action-btn',
            $icon: {
              html: 'i',
              as: 'ion-plus-round'
            },
            text: ' Follow Eric Simons'
          }
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
            items: [{
              text: 'My Articles',
              active: true
            }, {
              text: 'Favorited Articles'
            }]
          }
        },
        defaultItem: {
          type: ArticleView
        },
        dataId: 'articles',
        dataChanged: Mutate.Items
      }
    }
  }
}
