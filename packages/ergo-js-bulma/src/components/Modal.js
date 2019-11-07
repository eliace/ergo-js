import { Html, Domain } from "chorda-core";
import { stopMouseDown } from '../dom'


export default class Modal extends Html {
    config () {
      return {
        sources: {
          __view: () => new Domain({}, {
            events: {
              close: {channel: '*'},
              open: {channel: '*'}
            }
          })
        },
        dom: { stopMouseDown },
        __viewChanged: function (v) {
  //        this.opt('classes', {'is-active': !!v.opened})
        },
        css: 'modal',
        $background: {
          css: 'modal-background',
          onMouseUp: function (e, {__view}) {
  //          __view.emit('close', null, {}, '*')
            __view.close()
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
          onClick: function (e, {__view}) {
  //          __view.emit('close', null, {}, '*')
            __view.close()
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
  