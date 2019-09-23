import {Html} from '../../src'

export default class DropdownItem extends Html {
    config () {
      return {
        html: 'a',
        css: 'dropdown-item'
      }
    }
  
    options () {
      return {
        active: {
          initOrSet: function (v) {
            this.opt('classes', {'is-active': v})
          }
        }
      }
    }
  }
  