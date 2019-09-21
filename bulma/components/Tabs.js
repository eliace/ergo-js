import { Html, Domain } from '../../src'
import { List } from '../elements'

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
      active: {
        initOrSet: function (v) {
          this.opt('classes', {'is-active': v})
        }
      }
    }
  }
}


class Tabs extends Html {

  config () {
    return {
      sources: {
        __state: function () {
          return new Domain({
            current: null
          }, {
            actions: {
              select: function (v) {
                this.set('current', v)
              }
            }
          })
        }
      },
      css: 'tabs',
      $list: {
        as: List,
        defaultItem: {
          as: Tab,
          __stateChanged: function (v) {
            this.opt('active', v.current != null && v.current == this.opt('key'))
          },
          onClick: function (e, {__state}) {
            __state.actions.select(this.options.key)
          }
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
          this.$list.options.defaultItem.merge(v)
        }
      },
      selected: {
        initOrSet: function (v) {
          this.sources.__state.actions.select(v)
        },
        clean: true
      }
    }
  }

}

Tabs.Tab = Tab


export default Tabs
