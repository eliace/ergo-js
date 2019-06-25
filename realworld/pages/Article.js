import {Html, Layout, Source} from '../../src'
import {Mutate} from '../utils'
import ColumnsLayout from '../layouts/Columns'
import PassThroughLayout from '../layouts/PassThrough'


class ArticleMeta extends Html {
  static defaultOpts = {
    as: 'article-meta',
    $avatar: {
      html: 'a',
      href: '',
      $content: {
        html: 'img',
        src: 'http://i.imgur.com/Qr71crq.jpg'
      },
      $info: {
        as: 'info',
        $author: {
          html: 'a',
          href: '',
          as: 'author',
          text: 'Eric Simons'
        },
        $date: {
          html: 'span',
          as: 'date',
          text: 'January 20th'
        }
      },
      $followBtn: {
        html: 'button',
        as: 'btn btn-sm btn-outline-secondary',
        $icon: {
          html: 'i',
          as: 'ion-plus-round',
          weight: -10
        },
        text: ' Follow Eric Simons ',
        $counter: {
          html: 'span',
          as: 'counter',
          text: '(10)',
          weight: 10
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
        text: ' Favorite Post ',
        $counter: {
          html: 'span',
          as: 'counter',
          text: '(29)',
          weight: 10
        }
      }
    }
  }
}


export default () => {
  return {
    as: 'article-page',
    $banner: {
      as: 'banner',
      $content: {
        as: 'container',
        $title: {
          html: 'h1',
          text: 'How to build webapps that scale'
        },
        $div: {
          html: 'br'
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
            text: 'Web development technologies have evolved at an incredible clip over the past few years.'
          },
          $intro: {
            html: 'h2',
            id: 'introducing-ionic',
            text: 'Introducing RealWorld.'
          },
          $desc: {
            html: 'p',
            text: 'It\'s a great solution for learning how other frameworks work.'
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
          $form: {
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
      },
      defaultItem: {
        as: 'card',
        $block: {
          as: 'card-block',
          $content: {
            as: 'card-text',
            text: 'With supporting text below as a natural lead-in to additional content.'
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
              src: 'http://i.imgur.com/Qr71crq.jpg'
            }
          },
          $div: {
            html: 'span',
            innerHTML: '&nbsp;'
          },
          $author: {
            html: 'a',
            href: '',
            as: 'comment-author',
            text: 'Jacob Schmidt'
          },
          $date: {
            html: 'span',
            as: 'date-posted',
            text: 'Dec 29th'
          }
        }
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
