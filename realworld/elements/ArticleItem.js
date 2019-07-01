import {Html, Layout, Source} from '../../src'
import dayjs from 'dayjs'
import {Mutate} from '../utils'
import Tags from './Tags'


export default class ArticleItem extends Html {
  static defaultOpts = {
    sources: {
      data: function () {
        return {
          author: {},
          createdAt: '',
          favoritesCount: 0,
          title: '',
          description: '',
          tagList: null
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
          dataChanged: function (v) {
            this.opt('text', v.author.username)
            this.opt('href', '/#/@'+v.author.username)
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
        html: 'span',
        text: 'Read more...'
      },
      $tagList: {
        type: Tags,
        dataId: 'tagList',
        dataChanged: Mutate.Items,
        defaultItem: {
          as: 'tag-outline',
          dataChanged: Mutate.Text
        }
      },
      dynamic: {
        tagList: true
      },
      dataChanged: function (v, k) {
        this.opt('href', '/#/article/'+v.slug)
        this.opt('$components', k)
      }
    }
  }
}
