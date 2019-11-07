import {Html, Domain, Layout, Events, Source} from 'chorda-core'
import {Layouts, Button, Box, Image, Modal, stopMouseDown, Input, Buttons, withDialogs} from 'chorda-bulma'


export class ModalModel extends Domain {
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
  
  
  export class BaseModal extends Html {
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
          view: (ctx, o) => ctx.view || new ModalModel({})
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
    properties () {
      return {
        active: {
          set: function (v) {
            this.opt('classes', {'is-active': !!v})
          }
        }
      }
    }
  }
  
  
  
  export class ImageModal extends BaseModal {
    config () {
      return {
        sources: {
          data: (ctx, o) => ctx.data
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
  
  
  
  export class InputDialog extends BaseModal {
    config () {
      return {
        active: true,
        sources: {
          data: () => '',
          view: () => new ModalModel({})
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
  