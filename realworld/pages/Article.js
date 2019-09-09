import {Html, Layout, Source as Domain} from '../../src'
import {Mutate} from '../utils'
import ColumnsLayout from '../layouts/Columns'
import PassThroughLayout from '../layouts/PassThrough'
import ArticleMeta from '../components/ArticleMeta'
import Tags from '../elements/Tags'
import dayjs from 'dayjs'
import {getComments} from '../effectors'





class Comment extends Html {
  static defaultOpts = {
    css: 'card',
    $block: {
      css: 'card-block',
      $content: {
        css: 'card-text',
        dataChanged: function (v) {
          this.opt('text', v.body)
        }
//        text: 'With supporting text below as a natural lead-in to additional content.'
      }
    },
    $footer: {
      css: 'card-footer',
      $avatar: {
        html: 'a',
        href: '',
        css: 'comment-author',
        $img: {
          html: 'img',
          css: 'comment-author-img',
          dataChanged: function (v) {
            this.opt('src', v.author.image)
          }
//          src: 'http://i.imgur.com/Qr71crq.jpg'
        }
      },
      $div: {
        html: 'span',
        innerHTML: '&nbsp;'
      },
      $author: {
        html: 'a',
        css: 'comment-author',
        dataChanged: function (v) {
          this.opt('text', v.author.username)
          this.opt('href', '/#/@'+v.author.username)
        }
//        text: 'Jacob Schmidt'
      },
      $date: {
        html: 'span',
        css: 'date-posted',
//        text: 'Dec 29th'
        dataChanged: function (v) {
          this.opt('text', dayjs(v.createdAt).format('MMMM D, YYYY'))
        }
      }
    }
  }
}



class EditableComment extends Html {
  static defaultOpts = {
    html: 'form',
    css: 'card comment-form',
    $block: {
      css: 'card-block',
      $control: {
        html: 'textarea',
        css: 'form-control',
        placeholder: 'Write a comment...',
        rows: 3
      }
    },
    $footer: {
      css: 'card-footer',
      $avatar: {
        html: 'img',
        css: 'comment-author-img',
        pageChanged: function (v) {
          this.opt('src', v.user.image)
        }
      },
      $postBtn: {
        html: 'button',
        css: 'btn btn-sm btn-primary',
        text: 'Post Comment'
      }
    }
  }
}







export default () => {
  return {
    dataId: 'article',
    sourcesBound: function ({page, data}) {

      const loadComments = data.effect('loadComments', this, async () => {
        const v = await getComments(page.get('slug'))
        data.set('comments', v.comments)
      })

      page.computed('newComment', this, v => !!v.user)

      data.watch(e => e.name == 'init' && e.target == this, this, (e) => {
        loadComments()
      })
    },
    dataEvents: function (e) {
      console.log('[article] data', e)
    },
    pageEvents: function (e) {
      console.log('[article] page', e)
    },

    css: 'article-page',
    $banner: {
      css: 'banner',
      $content: {
        css: 'container',
        $title: {
          html: 'h1',
          dataId: 'title',
          dataChanged: Mutate.Text
        },
        $meta: {
          as: ArticleMeta
        }
      }
    },
    $content: {
      css: 'container page',
      $content: {
        css: 'row article-content',
        $content: {
          css: 'col-md-12',
          $content: {
            html: 'p',
            dataId: 'body',
            dataChanged: Mutate.Text
//            text: 'Web development technologies have evolved at an incredible clip over the past few years.'
          },
          $intro: {
            html: 'h2',
            id: 'introducing-ionic',
//            text: 'Introducing RealWorld.'
          },
          $desc: {
            html: 'p',
            dataId: 'description',
            dataChanged: Mutate.Text
          },
          $tags: {
            as: Tags,
            dataId: 'tagList',
            dataChanged: Mutate.Items,
            defaultItem: {
              dataChanged: Mutate.Text,
              css: 'tag-outline',
            }
          }
        }
      },
      $div: {
        html: 'hr'
      },
      $actions: {
        css: 'article-actions',
        $meta: {
          as: ArticleMeta
        }
      },
      $comments: {
        css: 'row',
        $content: {
          css: 'col-xs-12 col-md-8 offset-md-2',
          components: {
            newComment: false
          },
          pageChanged: function (v, k) {
            this.opt('$components', this.sources[k])
          }, //Mutate.Components,
          dataId: 'comments',
          dataChanged: Mutate.Items,
          $newComment: {
            as: EditableComment
          },
          defaultItem: {
            as: Comment
          },
          // items: [{}, {
          //   $footer: {
          //     $modOptions: {
          //       html: 'span',
          //       css: 'mod-options',
          //       defaultItem: {
          //         html: 'i'
          //       },
          //       items: [
          //         {css: 'ion-edit'},
          //         {css: 'ion-trash-a'}
          //       ]
          //     }
          //   }
          // }]
        }
      }
    }
  }
}
