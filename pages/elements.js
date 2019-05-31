import {Html, Layouts, Tabs} from '../src'


export default () => {
  return {
    sources: {
      __tabs: ['alice', 'bob', 'charlie'],
      __selection: {current: 'alice'}
    },
    layout: Layouts.Container,
    $tabBox: {
      type: Tabs,
      __tabsOptions: function (v) {
        this.opt('$tabs', v, '__tabs')
      },
      $list: {
        defaultItem: {
          __selectionOptions: function(v) {
            return {classes: {'is-active': v.current == this.sources.__tabs.get()}}
          },
          __tabsOptions: function (v) {
            const selection = this.sources.__selection.get()
            return {text: v, classes: {'is-active': selection.current == v}}
          },
          onClick: function() {
            this.sources.__selection.set('current', this.sources.__tabs.get())
          }
        }
      }
    }
  }
}
