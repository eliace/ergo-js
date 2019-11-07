import {Html, Text} from 'chorda-core'
import {Layouts, Tabs, IconBox} from 'chorda-bulma'
import {Mutate, compose} from '../helpers'

// function Selectable () {
//   return {
//     selectionChanged: function (v) {
//       return {selected: v == this.opt('key')}
//     },
//     onClick: function(e, {selection}) {
//       selection.set(this.opt('key'))
//     }
//   }
// }


// const Fas = function () {
//   return  {
//     $content: {
//       classes: {'fas': true}
//     }
//   }
// }
const withIcon = function () {
  return {
    $content: {
      $icon: {
        as: IconBox,
//        mixins: { Fas },
      },
      $content: {
        html: 'span'
      }
    },
    properties: {
      icon: {
        set: function (v) {
          this.$content.$icon.opt('icon', v)
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
    scope: {
      tabs: ['Pictures', 'Music', 'Videos', 'Documents'],
      data: [
        {icon: 'fa-image', text: 'Pictures'},
        {icon: 'fa-music', text: 'Music'},
        {icon: 'fa-film', text: 'Video'},
        {icon: 'fa-file-alt', text: 'Documents'},
      ]
    },
    defaultItem: {
      as: Tabs,
      selected: 'Pictures'
    },
//    layout: Layouts.Container,
    items: [{
      tabsChanged: function (v, s) {
        this.opt('tabs', s.$iterator())
      },
      defaultTab: {
        tabsChanged: compose(Mutate.Text, Mutate.Key)
      }
    }, {
      css: 'is-centered',
      tabsChanged: Mutate.Tabs,
      defaultTab: {
        tabsChanged: compose(Mutate.Text, Mutate.Key)
      }
    }, {
      css: 'is-centered',
      dataChanged: Mutate.Tabs,
      defaultTab: {
        mixins: {withIcon},
        dataChanged: function (v) {
          return {key: v.text, text: v.text, icon: v.icon}
        }
      }
    }, {
      css: 'is-small',
      tabsChanged: Mutate.Tabs,
      defaultTab: {
        tabsChanged: compose(Mutate.Text, Mutate.Key)
      }
    }, {
      css: 'is-medium',
      tabsChanged: Mutate.Tabs,
      defaultTab: {
        tabsChanged: compose(Mutate.Text, Mutate.Key)
      }
    }, {
      css: 'is-large',
      tabsChanged: Mutate.Tabs,
      defaultTab: {
        tabsChanged: compose(Mutate.Text, Mutate.Key)
      }
    }, {
      dataChanged: Mutate.Tabs,
      css: 'is-boxed',
      defaultTab: {
        mixins: {withIcon},
        dataChanged: function (v) {
          return {key: v.text, text: v.text, icon: v.icon}
        }
      }
    }, {
      dataChanged: Mutate.Tabs,
      css: 'is-toggle',
      defaultTab: {
        mixins: {withIcon},
        dataChanged: function (v) {
          return {key: v.text, text: v.text, icon: v.icon}
        }
      }
    }, {
      dataChanged: Mutate.Tabs,
      css: 'is-toggle is-toggle-rounded',
      defaultTab: {
        mixins: {withIcon},
        dataChanged: function (v) {
          return {key: v.text, text: v.text, icon: v.icon}
        }
      }
    }, {
      dataChanged: Mutate.Tabs,
      css: 'is-toggle is-fullwidth',
      defaultTab: {
        mixins: {withIcon},
        dataChanged: function (v) {
          return {key: v.text, text: v.text, icon: v.icon}
        }
      }
    }]
  }
}
