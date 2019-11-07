import { Html, Domain } from 'chorda-core'
import { El, StopMouseDown } from '../utils'
import DropdownItem from './DropdownItem'


export default class ListDropdown extends Html {
    config () {
      return {
        sources: {
          state: (ctx) => ctx.state,//.$entry('value'),
          dropdown: (ctx) => ctx.dropdown
        },
        css: 'is-hovered',
        dropdownChanged: function (v, s) {
          if (v) {
            this.eff((el) => {
              this.items.filter(itm => itm.opts.active).forEach(itm => el.scrollTop = itm.el.offsetTop - 20)
            })  
          }
        },
        defaultItem: {
            as: DropdownItem,
            onClick: function (e, {state, dropdown}) {
                state.set(this.options.value)
                dropdown.set(false)
            },
            stateChanged: function (v) {
                this.opt('active', v == this.options.value)
            },
            dom: { El }
        },
//        dom: { El }
      }
    }
  }
  