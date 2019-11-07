import {Html, Domain, Layout, Events, Source} from 'chorda-core'
import {Layouts, Button, Box, Image, Modal, stopMouseDown, Input, Buttons, withDialogs} from 'chorda-bulma'

import { InputDialog, ImageModal, ModalModel } from './common'

import imgUrl from '../../img/Yosemite 3.jpg'
import { ExampleBox } from '../../extensions'


import modal1 from './modal1'
import modal1_code from '!raw-loader!./modal1'
import modal2 from './modal2'
import modal2_code from '!raw-loader!./modal2'





export default () => {
  return {
    sources: {
      data: {
//        image: imgUrl
      },
      view: {
        dialogResult: 'You can change this text in dialog'
      }
    },
    layout: Layouts.Rows,
    mix: { withDialogs },
    defaultItem: {
      as: ExampleBox
    },
    items: [{
      title: 'Property toggle',
      description: 'Видимостью модала управляем с поможью css класса. Сам модал постоянно присутствует в DOM',
      example: modal1,
      code: modal1_code
    }, {
      title: 'Component toggle',
      description: 'Модал становится видимым при включении в список компонентов, т.е. когда модал не видно, его нет и в DOM',
      example: modal2,
      code: modal2_code
    }, {
      title: 'Dialog (dialogs channel)',
      description: 'Диалог отличается от простого модала тем, что он должен вернуть ответ в контекст вызова. Для этого, например, можно воспользоваться методикой делегирования',
      example: {
        $button: {
          as: Button,
          text: 'Open Dialog',
          onClick: function (e, {view, dialogs}) {
            dialogs.open({
              as: InputDialog,
              sources: {
                data: () => view.$get('dialogResult')
              },
              onOk: function (e, {data}) {
                view.$set('dialogResult', data.$get())
              }
            })
          }
        },
        $resultText: {
          viewChanged: function (v) {
            this.opt('text', v.dialogResult)
          }
        }  
      }
    }, {
      title: 'Dialog (async action)',
      description: 'Сохранить контекст можно с помощью асинхронного action-а с эффектом ожидания. При закрытии диалога, эффект завершается и action возвращает результат в точку вызова',
      example: {
        sources: {
          view: () => new Domain({}, {
            properties: {
              isOpened: {},
              dialogResult: {},
              dialogData: {}
            },
            actions: {
              ask: async function (input) {
                this.dialogData = input
                this.isOpened = true
                const v = await this.effects.answer()
                this.isOpened = false
                return v
              }
            },
            effects: {
              answer: () => {}
            },
            events: {
              answer: {method: true}
            }
          }),
          resultText: () => 'Text to change'
        },
        $button: {
          as: Button,
          text: 'Open Dialog',
          onClick: async function (e, {view, resultText}) {
            resultText.$value = await view.ask(resultText.$value) || resultText.$value
          }
        },
        $dialog: {
          sources: {
            result: (ctx) => ctx.view,
            data: (ctx) => ctx.view.dialogData || ''
          },
          as: InputDialog,
          onOk: function (e, {result, data}) {
            result.answer(data.$value)
          },
          onCancel: function (e, {result}) {
            result.answer()
          }
        },
        $resultText: {
          resultTextChanged: function (v) {
            this.opt('text', v)
          }
        },
        viewChanged: function (v) {
          this.opt('components', {dialog: v.isOpened})
        }
      }
    }/*, {
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
          view: (ctx, o) => ctx.addDialog,
          list: (ctx, o) => ctx.data
        },
        as: InputDialog,
        onOk: function (e, {list, data}) {
          // здесь не доступен контекст, куда надо записать результат
//          list.$add(data.$get())
        }
      },
      $dialog2: {
        sources: {
          view: (ctx, o) => ctx.editDialog,
          data: (ctx, o) => ctx.view.$entry('value')
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
            __view: (ctx, o) => ctx.view
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
        modals: (ctx, o) => ctx.modals
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
