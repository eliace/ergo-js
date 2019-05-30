import {Html, Layouts, Tabs} from '../src'


export default () => {
  return {
    sources: {
      tabs: ['alice', 'bob', 'charlie'],
//      __selection: {}
    },
    layout: Layouts.Container,
    $tabBox: {
      type: Tabs,
      tabsOptions: function (v) {
        this.opt('$tabs', v, 'tabs')
      },
      $list: {
        defaultItem: {
          tabsOptions: function (v) {
//            const selection = this.sources.__selection.get()
            return {text: v/*, classes: {'is-active': selection}*/}
          }
        }
      }
    }
  }
}
