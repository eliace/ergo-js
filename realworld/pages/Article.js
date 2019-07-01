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
    as: 'card',
    $block: {
      as: 'card-block',
      $content: {
        as: 'card-text',
        dataChanged: function (v) {
          this.opt('text', v.body)
        }
//        text: 'With supporting text below as a natural lead-in to additional content.'
      }
    },
    $footer: {
      as: 'card-footer',
      $avatar: {
        html: 'a',
        href: '',
        as: 'comment-author',
        $img: {
          html: 'img',
          as: 'comment-author-img',
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
        as: 'comment-author',
        dataChanged: function (v) {
          this.opt('text', v.author.username)
          this.opt('href', '/#/@'+v.author.username)
        }
//        text: 'Jacob Schmidt'
      },
      $date: {
        html: 'span',
        as: 'date-posted',
//        text: 'Dec 29th'
        dataChanged: function (v) {
          this.opt('text', dayjs(v.createdAt).format('MMMM D, YYYY'))
        }
      }
    }
  }
}



class EditComment extends Html {
  static defaultOpts = {
    html: 'form',
    as: 'card comment-form',
    $block: {
      as: 'card-block',
      $control: {
        html: 'textarea',
        as: 'form-control',
        placeholder: 'Write a comment...',
        rows: 3
      }
    },
    $footer: {
      as: 'card-footer',
      $avatar: {
        html: 'img',
        as: 'comment-author-img',
        src: 'http://i.imgur.com/Qr71crq.jpg'
      },
      $postBtn: {
        html: 'button',
        as: 'btn btn-sm btn-primary',
        text: 'Post Comment'
      }
    }
  }
}







export default () => {
  return {
    sources: {
      // data: {
      //
      // },
      page: new Domain({}, {
        computed: {
          newComment: function (v) {
            return !!v.auth
          }
        }
      })
    },
    dataMethods: {
      loadComments: getComments
    },
    pageChanged: function (v) {
    },
    dataEvents: function (evt) {
      const {data, page} = this.domain
      if (evt.name == 'init') {
        data.loadComments(data.get('slug'))
      }
      else if (evt.name == getComments.done) {
        data.set('comments', evt.data.comments)
      }
    },
    as: 'article-page',
    $banner: {
      as: 'banner',
      $content: {
        as: 'container',
        $title: {
          html: 'h1',
          dataId: 'title',
          dataChanged: Mutate.Text
        },
        $meta: {
          type: ArticleMeta
        }
      }
    },
    $content: {
      as: 'container page',
      $content: {
        as: 'row article-content',
        $content: {
          as: 'col-md-12',
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
            type: Tags,
            dataId: 'tagList',
            dataChanged: Mutate.Items,
            defaultItem: {
              dataChanged: Mutate.Text,
              as: 'tag-outline',
            }
          }
        }
      },
      $div: {
        html: 'hr'
      },
      $actions: {
        as: 'article-actions',
        $meta: {
          type: ArticleMeta
        }
      },
      $comments: {
        as: 'row',
        $content: {
          as: 'col-xs-12 col-md-8 offset-md-2',
          dynamic: true,
          pageChanged: Mutate.Components,
          dataId: 'comments',
          dataChanged: Mutate.Items,
          $newComment: {
            type: EditComment
          },
          defaultItem: {
            type: Comment
          },
          items: [{}, {
            $footer: {
              $modOptions: {
                html: 'span',
                as: 'mod-options',
                defaultItem: {
                  html: 'i'
                },
                items: [
                  {as: 'ion-edit'},
                  {as: 'ion-trash-a'}
                ]
              }
            }
          }]
        }
      }
    }
  }
}
