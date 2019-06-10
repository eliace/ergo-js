import {Html} from '../core'
import {List} from '../elements'

class Tab extends Html {
  static defaultOpts = {
    components: {
      content: {
        html: 'a'
      }
    }
  }
  static OPTIONS = {
    selected: {
      set: function (v) {
        this.opt('classes', {'is-active': v})
      }
    }
  }
}


class Tabs extends Html {
  static defaultOpts = {
    class: 'tabs',
    components: {
      list: {
        type: List,
        defaultItem: {
          type: Tab
        }
      }
    }
  }
  static OPTIONS = {
    tabs: {
      initOrSet: function (v) {
        if (this.$list) {
          this.$list.opt('items', v)
        }
      }
    },
    defaultTab: {
      init: function (v) {
//        this.options.components.list.merge({defaultItem: v})
        this.$list.options.defaultItem.merge(v)
      }
    }
  }

  static Tab = Tab
}


export default Tabs
