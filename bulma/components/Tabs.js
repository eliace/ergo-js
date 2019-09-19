import {Html} from '../../src'
import {List} from '../elements'

class Tab extends Html {

  config () {
    return {
      $content: {
        html: 'a'
      }
    }
  }

  options () {
    return {
      selected: {
        initOrSet: function (v) {
          this.opt('classes', {'is-active': v})
        }
      }
    }
  }
}


class Tabs extends Html {

  config (options) {
    return {
      css: 'tabs',
      $list: {
        as: List,
        defaultItem: {
          as: Tab
        }
      }
    }
  }

  options () {
    return {
      tabs: {
        initOrSet: function (v) {
          if (this.$list) {
            this.$list.opt('items', v)
          }
        },
        mutable: true
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
