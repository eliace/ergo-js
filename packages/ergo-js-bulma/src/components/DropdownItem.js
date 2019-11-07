import {Html} from 'chorda-core'

export default class DropdownItem extends Html {
    config () {
      return {
        html: 'a',
        css: 'dropdown-item'
      }
    }
  
    properties () {
      return {
        active: {
          set: function (v) {
            this.opt('classes', {'is-active': v})
          }
        }
      }
    }
  }
  