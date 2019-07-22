import {Html} from '../core'
import {List} from '../elements'

class Tab extends Html {

  config () {
    return {
      $content: {
        html: 'a'
      }
    }
  }

  configOptions () {
    return {
      selected: {
        set: function (v) {
          this.opt('classes', {'is-active': v})
        }
      }
    }
  }
}


class Tabs extends Html {

  config (options) {
    return {
      as: 'tabs',
      $list: {
        type: List,
        defaultItem: {
          type: Tab
        }
      }
    }
  }

  configOptions () {
    return {
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
  }

  static Tab = Tab
}


export default Tabs
