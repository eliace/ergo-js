import {Html, Domain, Layout, Events, Source} from '../../src'
import {Layouts, Button, Box, Image, Modal, stopMouseDown, Input, Buttons} from '../../bulma'


import imgUrl from '../img/Yosemite 3.jpg'



class ModalModel extends Domain {
  config () {
    return {
      properties: {
        opened: {}
      },
      actions: {
        open: function () {
          this.opened = true
        },
        close: function () {
          this.opened = false
        }
      }
    }
  }
}


class BaseModal extends Html {
  config () {
    return {
      sources: {
        //собственная модель
        // view: () => new Domain({}, {
        //   events: {
        //     close: {channel: '*'},
        //     open: {channel: '*'}
        //   }
        // }),

        // внешняя модель
        view: (o, ctx) => ctx.view || new ModalModel({})
      },
      join: {
        view: {
          BaseModal: function (joint) {
            joint.createProperty('opened')
            joint.createAction('open', () => {
              joint.opened = true
            })
            joint.createAction('close', () => {
              joint.opened = false
            })
          }
        }
      },
      dom: { stopMouseDown },
      // viewChanged: function (v) {
      // },
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
  options () {
    return {
      active: {
        initOrSet: function (v) {
          this.opt('classes', {'is-active': !!v})
        }
      }
    }
  }
}



class ImageDialog extends BaseModal {
  config () {
    return {
      sources: {
        data: (o, ctx) => ctx.data
      },
      active: true,
      $content: {
        $image: {
          as: Image,
          dataChanged: function (v) {
            this.opt('src', v.url)
          }
        }
      }  
    }
  }
}



class InputDialog extends BaseModal {
  config () {
    return {
      active: true,
      sources: {
        data: () => ''
      },
      join: {
        view: {
          InputDialog: function (j) {
            j.createEvent('ok', {channel: '*'})
            j.createEvent('cancel', {channel: '*'})
          }
        }
      },
      $content: {
        as: Box,
        $input: {
          as: Input,
          dataChanged: function (v) {
            this.opt('value', v)
          },
          onChange: function (e, {data}) {
            data.$set(e.target.value)
          }   
        },
        $buttons: {
          as: Buttons,
          $ok: {
            text: 'OK',
            onClick: function (e, {view}) {
              view.ok()
              view.close()
            }
          },
          $cancel: {
            text: 'Cancel',
            onClick: function (e, {view}) {
              view.cancel()
              view.close()
            }
          }
        }
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
    sources: {
      data: {
//        image: imgUrl
      },
      view: {},
      delegate: () => new Domain({components: []}, {
        properties: {
          components: {type: Domain}
        },
        actions: {
          open: function (c) {
            this.components.$add(c)
          }
        }
      })
    },
    layout: Layouts.Rows,
    $modalDelegate: {
      defaultItem: {
        join: {
          view: {
            Delegate: function (j) {
              j.on('close', () => {
                const c = this.sources.delegate.components
                const v = c.$get()
                v.splice(this.index, 1)
                c.$set(v)
              })
            }
          }
        }
        // delegateJoined: function (j) {
        //   j.on('close', () => {
        //     debugger
        //   })
        // }  
      },
      delegateChanged: function (v, s) {
        this.opt('items', v.components)
      }
    },
    items: [{
      // внешнее управление, внутренний контекст
      sources: {
        view: () => {
          return {}
        },
        data: () => {
          return {url: imgUrl}
        }
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
          view: (o, ctx) => ctx.view // переопределение канала view. если внутренняя модель была, то она теперь недоступна
        },
        as: ImageDialog,
        active: false,
        viewChanged: function (v) {
          this.opt('active', v.opened)
        }
      }
    }, {
      // внешнее управление, внутренний контекст
      sources: {
        view: () => {
          return new ModalModel({}) // взаимодействовать с компонентом, которого еще нет мы можем только через канал
        },
        data: () => {
          return {url: imgUrl}
        }
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
          view: (o, ctx) => ctx.view // указываем, что используется внешняя модель
        },
        as: ImageDialog
      },
      viewChanged: function (v) {
        this.opt('components', {modal: v.opened})
      },
      components: {
        modal: false // блокируем инициализацию
      }
    }, {
      sources: {
        data: ['Alice', 'Bob', 'Charlie'],
        view: () => {
          return new Domain({}, {
            properties: {
              value: {}
              // addDialog: {
              //   type: ModalModel,
              //   initial: () => {return {}}
              // }
            }
          })
        },
        addDialog: () => new ModalModel({}),
        editDialog: () => new ModalModel({}),
      },
      $add: {
        as: Button,
        text: 'Add',
        css: 'is-primary',
        onClick: function (e, {view, addDialog, delegate}) {
          delegate.open({
            as: InputDialog,
            onOk: function () {
              debugger
            }
          })
//          addDialog.open()
        }
      },
      $content: {
        as: Box,
        defaultItem: {
          $content: {
            as: Button,
            width: '100%',
            dataChanged: function (v) {
              this.opt('text', v)
            },
            onClick: function (e, {view, data, editDialog}) {
              view.value = data.$get()
              editDialog.open()
            }
          }
        },
        dataChanged: function (v, s) {
          this.opt('items', s)
        }  
      },
      $dialog: {
        sources: {
          view: (o, ctx) => ctx.addDialog,
          list: (o, ctx) => ctx.data
        },
        as: InputDialog,
        onOk: function (e, {list, data}) {
          // здесь не доступен контекст, куда надо записать результат
//          list.$add(data.$get())
        }
      },
      $dialog2: {
        sources: {
          view: (o, ctx) => ctx.editDialog,
          data: (o, ctx) => ctx.view.$entry('value')
        },
        as: InputDialog,
        onOk: function (e, {data}) {
          // здесь не доступен контекст, куда надо записать результат
        }
      },
      components: {
        dialog: false,
        dialog2: false
      },
      addDialogChanged: function (v) {
        this.opt('components', {dialog: v.opened})
      },
      editDialogChanged: function (v) {
        this.opt('components', {dialog2: v.opened})
      }
    }/*, {
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
    }*/]
  }
}
