import {Html, Text} from '../../src'
import {Layouts, Tabs, IconBox} from '../../bulma'
import {Mutate, compose} from '../helpers'

function Selectable () {
  return {
    selectionChanged: function (v) {
      return {selected: v == this.opt('key')}
    },
    onClick: function(e, {selection}) {
      selection.set(this.opt('key'))
    }
  }
}


const Fas = function () {
  return  {
    $content: {
      classes: {'fas': true}
    }
  }
}
const WithIcon = function () {
  return {
    $content: {
      $icon: {
        as: IconBox,
        mixins: { Fas },
      },
      $content: {
        html: 'span'
      }
    },
    options: {
      icon: {
        initOrSet: function (v) {
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
    sources: {
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
      sources: {
        selection: 'Pictures'
      }
    },
//    layout: Layouts.Container,
    items: [{
      tabsChanged: Mutate.Tabs,
      defaultTab: {
        mixins: { Selectable },
        tabsChanged: compose(Mutate.Text, Mutate.Key)
      }
    }, {
      css: 'is-centered',
      tabsChanged: Mutate.Tabs,
      defaultTab: {
        mixins: { Selectable },
        tabsChanged: compose(Mutate.Text, Mutate.Key)
      }
    }, {
      css: 'is-centered',
      dataChanged: Mutate.Tabs,
      defaultTab: {
        mixins: [Selectable, WithIcon],
        dataChanged: function (v) {
          return {key: v.text, text: v.text, icon: v.icon}
        }
      }
    }, {
      css: 'is-small',
      tabsChanged: Mutate.Tabs,
      defaultTab: {
        mixins: { Selectable },
        tabsChanged: compose(Mutate.Text, Mutate.Key)
      }
    }, {
      css: 'is-medium',
      tabsChanged: Mutate.Tabs,
      defaultTab: {
        mixins: { Selectable },
        tabsChanged: compose(Mutate.Text, Mutate.Key)
      }
    }, {
      css: 'is-large',
      tabsChanged: Mutate.Tabs,
      defaultTab: {
        mixins: { Selectable },
        tabsChanged: compose(Mutate.Text, Mutate.Key)
      }
    }, {
      dataChanged: Mutate.Tabs,
      css: 'is-boxed',
      defaultTab: {
        mixins: [Selectable, WithIcon],
        dataChanged: function (v) {
          return {key: v.text, text: v.text, icon: v.icon}
        }
      }
    }, {
      dataChanged: Mutate.Tabs,
      css: 'is-toggle',
      defaultTab: {
        mixins: [Selectable, WithIcon],
        dataChanged: function (v) {
          return {key: v.text, text: v.text, icon: v.icon}
        }
      }
    }, {
      dataChanged: Mutate.Tabs,
      css: 'is-toggle is-toggle-rounded',
      defaultTab: {
        mixins: [Selectable, WithIcon],
        dataChanged: function (v) {
          return {key: v.text, text: v.text, icon: v.icon}
        }
      }
    }, {
      dataChanged: Mutate.Tabs,
      css: 'is-toggle is-fullwidth',
      defaultTab: {
        mixins: [Selectable, WithIcon],
        dataChanged: function (v) {
          return {key: v.text, text: v.text, icon: v.icon}
        }
      }
    }]
  }
}
