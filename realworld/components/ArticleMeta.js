import {Html, Layout, Source} from '../../src'
import {Mutate} from '../utils'
import ColumnsLayout from '../layouts/Columns'
import PassThroughLayout from '../layouts/PassThrough'
import dayjs from 'dayjs'


export default class ArticleMeta extends Html {
  static defaultOpts = {
    as: 'article-meta',
    $avatar: {
      html: 'a',
      href: '',
      $content: {
        html: 'img',
        dataChanged: function (v) {
          this.opt('src', v.author.image)
        }
      }
    },
    $info: {
      as: 'info',
      $author: {
        html: 'a',
        href: '',
        as: 'author',
        dataChanged: function (v) {
          this.opt('text', v.author.username)
          this.opt('href', '/#/@'+v.author.username)
        }
      },
      $date: {
        html: 'span',
        as: 'date',
        dataChanged: function (v) {
          this.opt('text', dayjs(v.createdAt).format('MMMM D, YYYY'))
        }
      }
    },
    $followBtn: {
      html: 'button',
      as: 'btn btn-sm',
      $icon: {
        html: 'i',
        as: 'ion-plus-round',
        weight: -10
      },
//        text: ' Follow Eric Simons ',
      $counter: {
        html: 'span',
        as: 'counter',
//          text: '(10)',
//           dataChanged: function (v) {
// //            this.opt('text', '('+v.favoritesCount+')')
//           },
        weight: 10
      },
      dataChanged: function (v) {
        this.opt('text', ' Follow ' + v.author.username + ' ')
        this.opt('classes', {[v.author.following ? 'btn-outline-primary' : 'btn-outline-secondary']: true})
      }

    },
    $div: {
      html: 'span',
      innerHTML: '&nbsp;&nbsp;'
    },
    $favoriteBtn: {
      html: 'button',
      as: 'btn btn-sm btn-outline-primary',
      $icon: {
        html: 'i',
        as: 'ion-heart',
        weight: -10
      },
      text: ' Favorite Article ',
      $counter: {
        html: 'span',
        as: 'counter',
        dataChanged: function (v) {
          this.opt('text', '('+v.favoritesCount+')')
        },
        weight: 10
      }
    }
  }
}
