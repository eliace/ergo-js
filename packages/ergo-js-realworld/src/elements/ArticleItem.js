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
    css: 'article-preview',
    $meta: {
      css: 'article-meta',
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
        css: 'info',
        $author: {
          html: 'a',
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
            this.opt('text', dayjs(v.createdAt).format('MMMM D'))
          }
        }
      },
      $btn: {
        html: 'button',
        css: 'btn btn-outline-primary btn-sm pull-xs-right',
        $icon: {
          html: 'i',
          css: 'ion-heart'
        },
        dataChanged: function (v) {
          this.opt('text', ' ' + v.favoritesCount)
        }
      }
    },
    $link: {
      html: 'a',
      css: 'preview-link',
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
        as: Tags,
        dataId: 'tagList',
        dataChanged: Mutate.Items,
        defaultItem: {
          css: 'tag-outline',
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
