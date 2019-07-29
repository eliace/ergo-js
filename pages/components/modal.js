import {Html, Domain, Layout} from '../../src'
import {Layouts, Button, Box, Image} from '../../bulma'


import imgUrl from '../img/Yosemite 3.jpg'


class ModalDomain extends Domain {
  config () {
    return {
      initial: function () {
        return {}
      },
      methods: {
        open: function () {
          this.set('opened', true)
        },
        close: function () {
          this.set('opened', false)
        }
      }
    }
  }
}


class Modal extends Html {
  config () {
    return {
      sources: {
        view: function (o, k) {
          return o.sources[k] || new ModalDomain()
        }
      },
      viewChanged: function (v) {
        this.opt('classes', {'is-active': !!v.opened})
      },
      as: 'modal',
      $background: {
        as: 'modal-background',
        onMouseUp: function (e, {view}) {
          view.close()
        }
      },
      $content: {
        as: 'modal-content',
        onMouseDown: function (e) {
          e.stopPropagation()
        }
      },
      $close: {
        html: 'button',
        as: 'modal-close is-large',
        onClick: function (e, {view}) {
          view.close()
        }
      }
    }
  }
}


class Article extends Html {
  config () {
    return {
      html: 'article',
      layout: Layouts.Media,
      $image: {

      },
      $content: {

      }
    }
  }
}



export default () => {
  return {
    layout: Layouts.Rows,
    items: [{
      sources: {
        view: new ModalDomain({}, {
          properties: {
            modal: {
              calc: (v) => v.opened
            }
          }
        })
      },
      components: {
        modal: false
      },
      viewChanged: function (v, k) {
        this.opt('$components', k)
      },
      $button: {
        base: Button,
        text: 'Open Modal',
        onClick: function (e, {view}) {
          view.open()
        }
      },
      $modal: {
        base: Modal,
        $content: {
          $box: {
            base: Box,
            $article: {
              base: Article
            }
          }
        }
      }
    }, {
      sources: {
        view: new ModalDomain()
      },
      $button: {
        base: Button,
        text: 'Open Modal',
        onClick: function (e, {view}) {
          view.open()
        }
      },
      $modal: {
        base: Modal,
        $content: {
          $image: {
            base: Image,
            src: imgUrl
          }
        }
      }
    }]
  }
}
