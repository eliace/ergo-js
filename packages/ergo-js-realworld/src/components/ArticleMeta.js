import {Html, Layout, Source} from 'chorda-core'
import {Mutate} from '../utils'
import ColumnsLayout from '../layouts/Columns'
import dayjs from 'dayjs'


export default class ArticleMeta extends Html {
  config () {
    return {
      css: 'article-meta',
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
        css: 'info',
        $author: {
          html: 'a',
          href: '',
          css: 'author',
          dataChanged: function (v) {
            this.opt('text', v.author.username)
            this.opt('href', '/#/@'+v.author.username)
          }
        },
        $date: {
          html: 'span',
          css: 'date',
          dataChanged: function (v) {
            this.opt('text', dayjs(v.createdAt).format('MMMM D, YYYY'))
          }
        }
      },
      $followBtn: {
        html: 'button',
        css: 'btn btn-sm',
        $icon: {
          html: 'i',
          css: 'ion-plus-round',
          weight: -10
        },
  //        text: ' Follow Eric Simons ',
        $counter: {
          html: 'span',
          css: 'counter',
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
        css: 'btn btn-sm btn-outline-primary',
        $icon: {
          html: 'i',
          css: 'ion-heart',
          weight: -10
        },
        text: ' Favorite Article ',
        $counter: {
          html: 'span',
          css: 'counter',
          dataChanged: function (v) {
            this.opt('text', '('+v.favoritesCount+')')
          },
          weight: 10
        }
      }  
    }
  }
}
