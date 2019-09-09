import {Html, Domain, Layout, Events} from '../../src'
import {Layouts, Button, Box, Image} from '../../bulma'


import imgUrl from '../img/Yosemite 3.jpg'


class GModal extends Domain {
  config () {
    return {
      initial: function () {
        Events.on('keyup', (e) => {
          if (e.key == 'Escape') {
            this.esc()
          }
        })
        return {
          modals: []
        }
      },
      properties: {
        modals: {}
      },
      methods: {
        esc: function () {
          const modals = this.$entry('modals')
          if (!modals.$isEmpty()) {
            modals.$entry(modals.$size()-1).close()
          }
        },
        open: function (o) {
          this.$entry('modals').$add(o)
        },
        close: function (i) {
          this.$entry('modals').$remove(i)
        }
        // close: function (i) {
        //   this.props.modals.splice(i-1, 1)
        // },
        // open: function (o) {
        //   const modals = this.entry('modals')
        //   modals.$add(o)
        //   // this.props.modals.push({})
        //   // return this.props.modals.length
        // }
      },
      watchers: {
        visibility: {
          when: (e) => e.name == 'changed',// && e.ids && e.ids['modals'],
          callback: function () {
            console.log('modal visibility changed')
          }
        }
      }
    }
  }


  _close (i) {
    this.get('modals').splice(i-1, 1)
  }
}

const modal = new GModal()

// Events.on('keyup', (e) => {
//   if (e.key == 'Escape') {
//     modal.esc()
//   }
// })


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

  _close () {
    this.set('opened', false)
  }
}


class Modal extends Html {
  config () {
    return {
      sources: {
        view: function (o, k) {
          return (o.sources[k] && o.sources[k] instanceof Domain) || new ModalDomain()
        }
      },
      viewChanged: function (v) {
        this.opt('classes', {'is-active': !!v.opened})
      },
      css: 'modal',
      $background: {
        css: 'modal-background',
        onMouseUp: function (e, {view}) {
          view.close()
        }
      },
      $content: {
        css: 'modal-content',
        onMouseDown: function (e) {
          e.stopPropagation()
        }
      },
      $close: {
        html: 'button',
        css: 'modal-close is-large',
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


class ImageModal extends Modal {
  config () {
    return {
      $content: {
        $image: {
          as: Image,
          src: imgUrl
        }
      }
    }
  }
}

class BoxModal extends Modal {
  config () {
    return {
      $content: {
        as: Box,
        text: 'Hello'
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
            modal: (v) => v.opened
          }
        })
      },
      components: {
        modal: false
      },
      viewChanged: function (v, k, src) {
        this.opt('components', src.$stream(k))
      },
      $button: {
        as: Button,
        text: 'Open Modal',
        onClick: function (e, {view}) {
          view.open()
        }
      },
      $modal: {
        as: BoxModal
      }
    }, {
      sources: {
        view: new ModalDomain()
      },
      $button: {
        as: Button,
        text: 'Open Modal',
        onClick: function (e, {view}) {
          view.open()
        }
      },
      $modal: {
        as: ImageModal
      }
    }, {
      // встраивание в сторонний контейнер
      sources: {
        modal: new GModal()
      },
      $button: {
        as: Button,
        text: 'Open Modal',
        onClick: function (e, {modal}) {
          modal.open({
            as: ImageModal,
            $content: {
              $button: {
                as: Button,
                text: 'Open next',
                onClick: function (e, {modal}) {
                  modal.open({
                    as: BoxModal
                  })
                }
              }
            }
          })
        }
      },
      $standaloneModalContainer: {
        modalChanged: function (v, k, d) {
          this.opt('items', d.$entry('modals').get())
        },
        defaultItem: {
          allJoined: function ({view, modal}) {
            view.$on(view.close, () => {
              modal.close(this.index)
            }, this)
            view.open()
          },
          as: Modal
        }
      }
    }, {
      // подключение локального модала к общему домену
      sources: {
        modal: new GModal(),
        view: new ModalDomain({}, {
          properties: {
            modal: (v) => !!v.opened
          }
        })
      },
      allJoined: function ({modal, view}) {
        modal.$watch('init', this, () => {
          modal.open(view)
        })
        modal.$watch('destroy', this, () => {
          modal.close(view)
        })
      },
      $button: {
        as: Button,
        text: 'Open Modal',
        onClick: function (e, {view, modal}) {
          view.open()
        }
      },
      $modal: {
        as: ImageModal
      }
    }]
  }
}
