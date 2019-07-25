import {Html, Text} from '../../src'
import {Layouts, Tabs, IconBox} from '../../bulma'

function Selectable (opts) {
  return {
    selectionChanged: function (v) {
//      debugger
      return {selected: v == this.opt('key')}
    },
    onClick: function() {
      this.sources.selection.set(this.options.key)
    }
  }
}

const Mutate = {
  DynamicTabs: function (v, key) {return {$tabs: key}},
  TextAndKey: function (v) {return {key: v, text: v}},
  Text: function (v) {return {text: v}},
  Icon: function (v) {return {icon: v}}
}

const Mixins = {
  Fas: function () {
    return  {
      components: {
        content: {
          classes: {'fas': true}
        }
      }
    }
  },
  WithIcon: function () {
    return {
      components: {
        content: {
          components: {
            icon: {
              type: IconBox,
              mixins: [Mixins.Fas],
            },
            content: {
              html: 'span'
            }
          }
        }
      }
    }
  }
}

const TABS = [
  {icon: 'fa-image', text: 'Pictures'},
  {icon: 'fa-music', text: 'Music'},
  {icon: 'fa-film', text: 'Video'},
  {icon: 'fa-file-alt', text: 'Documents'},
]



export default () => {
  return {
    sources: {
      tabs: ['Pictures', 'Music', 'Videos', 'Documents'],
      selection: 'Pictures',
      data: [
        {icon: 'fa-image', text: 'Pictures'},
        {icon: 'fa-music', text: 'Music'},
        {icon: 'fa-film', text: 'Video'},
        {icon: 'fa-file-alt', text: 'Documents'},
      ]
    },
    defaultItem: {
      type: Tabs,
      sources: {
        selection: 'Pictures'
      }
    },
//    layout: Layouts.Container,
    items: [{
      tabsChanged: Mutate.DynamicTabs,
      defaultTab: {
        mixins: [Selectable],
        tabsChanged: Mutate.TextAndKey
      }
    }, {
      as: 'is-centered',
      tabsChanged: Mutate.DynamicTabs,
      defaultTab: {
        mixins: [Selectable],
        tabsChanged: Mutate.TextAndKey
      }
    }, {
      as: 'is-centered',
      dataChanged: Mutate.DynamicTabs,
      defaultTab: {
        mixins: [Selectable, Mixins.WithIcon],
        dataChanged: function (v) {
          this.$content.$icon.opt('icon', v.icon)
          return {key: v.text, text: v.text}
        }
      }
    }, {
      as: 'is-small',
      tabsChanged: Mutate.DynamicTabs,
      defaultTab: {
        mixins: [Selectable],
        tabsChanged: Mutate.TextAndKey
      }
    }, {
      as: 'is-medium',
      tabsChanged: Mutate.DynamicTabs,
      defaultTab: {
        mixins: [Selectable],
        tabsChanged: Mutate.TextAndKey
      }
    }, {
      as: 'is-large',
      tabsChanged: Mutate.DynamicTabs,
      defaultTab: {
        mixins: [Selectable],
        tabsChanged: Mutate.TextAndKey
      }
    }, {
      dataChanged: Mutate.DynamicTabs,
      as: 'is-boxed',
      defaultTab: {
        mixins: [Selectable, Mixins.WithIcon],
        dataChanged: function (v) {
          this.$content.$icon.opt('icon', v.icon)
          return {key: v.text, text: v.text}
        }
      }
    }, {
      dataChanged: Mutate.DynamicTabs,
      as: 'is-toggle',
      defaultTab: {
        mixins: [Selectable, Mixins.WithIcon],
        dataChanged: function (v) {
          this.$content.$icon.opt('icon', v.icon)
          return {key: v.text, text: v.text}
        }
      }
    }, {
      dataChanged: Mutate.DynamicTabs,
      as: 'is-toggle is-toggle-rounded',
      defaultTab: {
        mixins: [Selectable, Mixins.WithIcon],
        dataChanged: function (v) {
          this.$content.$icon.opt('icon', v.icon)
          return {key: v.text, text: v.text}
        }
      }
    }, {
      dataChanged: Mutate.DynamicTabs,
      as: 'is-toggle is-fullwidth',
      defaultTab: {
        mixins: [Selectable, Mixins.WithIcon],
        dataChanged: function (v) {
          this.$content.$icon.opt('icon', v.icon)
          return {key: v.text, text: v.text}
        }
      }
    }]
  }
}
