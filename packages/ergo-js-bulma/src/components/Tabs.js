import { Html, Domain } from 'chorda-core'
import { List } from '../elements'

class Tab extends Html {
  config () {
    return {
      $content: {
        html: 'a'
      }
    }
  }
  // options () {
  //   return {
  //     active: {
  //       initOrSet: function (v) {
  //         this.opt('classes', {'is-active': v})
  //       }
  //     }
  //   }
  // }
  options () {
    return {
      active: {
        set: function (v) {
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
            selected: null
          }/*, {
            actions: {
              select: function (v) {
                this.set('selected', v)
              }
            }
          }*/)
        }
      },
      css: 'tabs',
      $list: {
        as: List,
        defaultItem: {
          as: Tab,
          __stateChanged: function (v) {
            this.opt('active', v.selected != null && v.selected == (this.opt('key') || this.opt('text')))
          },
          onClick: function (e, {__state}) {
            __state.$set('selected', (this.key || this.text))
          }
        }
      }
    }
  }

  options () {
    return {
      // tabs: {
      //   initOrSet: function (v) {
      //     if (this.$list) {
      //       this.$list.opt('items', v)
      //     }
      //   },
      //   mutable: true
      // },
      defaultTab: {
        init: function (v) {
          this.$list.options.defaultItem.merge(v)
        }
      },
      // selected: {
      //   initOrSet: function (v) {
      //     this.sources.__state.set('selected', v)
      //   },
      //   clean: true
      // }
    }
  }

  properties () {
    return {
      tabs: {
        set: function (v) {
          if (this.$list) {
            this.$list.opt('items', v)
          }
        },
        mutable: true
      },
      selected: {
        set: function (v) {
          this.sources.__state.$set('selected', v)
        },
        clean: true
      }
    }
  }


}

Tabs.Tab = Tab


export default Tabs
