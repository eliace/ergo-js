import {Html, Layout, Source} from '../../src'
import dayjs from 'dayjs'
import {Mutate} from '../utils'

export default class ArticleView extends Html {
  static defaultOpts = {
    sources: {
      data: function () {
        return {
          author: {},
          createdAt: '',
          favoritesCount: 0,
          title: '',
          description: ''
        }
      }
    },
    as: 'article-preview',
    $meta: {
      as: 'article-meta',
      $profile: {
        html: 'a',
        href: 'profile.html',
        $image: {
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
          as: 'author',
          href: '',
          dataChanged: function (v) {
            this.opt('text', v.author.username)
          }
        },
        $date: {
          html: 'span',
          as: 'date',
          dataChanged: function (v) {
            this.opt('text', dayjs(v.createdAt).format('MMMM D'))
          }
        }
      },
      $btn: {
        html: 'button',
        as: 'btn btn-outline-primary btn-sm pull-xs-right',
        $icon: {
          html: 'i',
          as: 'ion-heart'
        },
        dataChanged: function (v) {
          this.opt('text', ' ' + v.favoritesCount)
        }
      }
    },
    $link: {
      html: 'a',
      as: 'preview-link',
      href: '',
      $title: {
        html: 'h1',
        dataId: 'title',
        dataChanged: Mutate.Text
      },
      $subtitle: {
        html: 'p',
        dataId: 'description',
        dataChanged: Mutate.Text
      },
      $cut :{
        as: 'span',
        text: 'Read more...'
      }
    }
  }
}
