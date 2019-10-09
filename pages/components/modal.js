import {Html, Domain, Layout, Events} from '../../src'
import {Layouts, Button, Box, Image, Modal} from '../../bulma'


import imgUrl from '../img/Yosemite 3.jpg'



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
      active: true,
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
      active: true,
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
      // управление через опцию active
      sources: {
        view: () => false
      },
      $button: {
        as: Button,
        text: 'Open Modal',
        onClick: function (e, {view}) {
          view.set(true)
        }
      },
      $modal: {
        as: BoxModal,
        active: false,
        viewChanged: function (v) {
          this.opt('active', v)
        },
        onClose: function (e, {view}) {
          view.set(false)
        }
      }
    }, {
      // управление через отключение/подключение компонента и событие onClose
      sources: {
        view: () => false
      },
      components: {
        modal: false
      },
      viewChanged: function (v, s) {
        this.opt('components', {modal: v})
      },
      $button: {
        as: Button,
        text: 'Open Modal',
        onClick: function (e, {view}) {
          view.set(true)
        }
      },
      $modal: {
        as: BoxModal,
        onClose: function (e, {view}) {
          view.set(false)
        }
      }
    }, {
      // управление через предоставление источника (view => __view)
      sources: {
        view: () => new Domain({}, {
          properties: {
            opened: {}
          },
          actions: {
            open: function () {
              this.set('opened', true)
            },
            close: function () {
              this.set('opened', false)
            }
          }
        })
      },
      viewChanged: function (v) {
          this.opt('components', {modal: v.opened})
      },
      $button: {
          as: Button,
          text: 'Open Modal',
          onClick: function (e, {view}) {
            view.open()
          }
      },
      $modal: {
          sources: {
            __view: (o, ctx) => ctx.view
          },
          as: ImageModal
      }
    }, {
      // подключение к глобальному координатору модалов
      sources: {
        view: () => new Domain({}, {
          properties: {
            opened: {}
          }
        }),
        modals: (o, ctx) => ctx.modals
      },
      components: {
        modal: false
      },
      viewChanged: function (v) {
        this.opt('components', {modal: v.opened})
      },
      $button: {
        as: Button,
        text: 'Open Modal',
        onClick: function (e, {view}) {
          view.set('opened', true)
        }
      },
      $modal: {
        as: ImageModal,
        allJoined: function ({__view, modals}) {
          __view.watch(e => e.name == 'init', () => {
            modals.open(__view)
          }, this)
        },
        onClose: function (e, {view}) {
          view.set('opened', false)
        }
      }
    }/*, {
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
        modalChanged: function (v, s) {
          this.opt('items', s.source.get('modals'))
        },
        defaultItem: {
          allJoined: function ({view, modal}) {
            view.on(view.close, () => {
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
        modal.watch('init', this, () => {
          modal.open(view)
        })
        modal.watch('destroy', this, () => {
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
    }*/]
  }
}
