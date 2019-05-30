import {Html} from '../core'
import {List} from '../elements'

class Tabs extends Html {
  static defaultOpts = {
    class: 'tabs',
    components: {
      list: {
        type: List,
        defaultItem: {
          components: {
            content: {
              html: 'a'
            }
          }
        }
      }
    }
  }
  static OPTIONS = {
    tabs: {
      set: function(v) {
//        v.forEach(t => )
      }
    },
    $tabs: {
      set: function (v, k) {
        if (this.$list) {
          this.$list.opt('$items', v, k)
        }
      }
    }
  }
}


export default Tabs
