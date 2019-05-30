import {Html} from '../core'

class Label extends Html {
  static defaultOpts = {
    html: 'p',
    class: 'menu-label'
  }
}

class Item extends Html {
  static defaultOpts = {
    components: {
      content: {
        html: 'a',
        // state: {},
        // stateBinding: function(v) {this.opt('classes', JSON.parse(JSON.stringify(v)))}
      }
    }
  }
  static OPTIONS = {
    selected: {
      set: function(v) {
//        console.log('set selected', this, v)
        this.$content.opt('classes', {'is-active': !!v})//opt('classes', {'is-active': v})
      }
    }
  }
}

class List extends Html {
  static defaultOpts = {
    class: 'menu-list',
    defaultItem: {
      type: Item
    },
    defaultComponent: {
      type: Item
    }
  }
}

class Menu extends Html {
  static defaultOpts = {
    html: 'aside',
    class: 'menu'
  }

  static Label = Label
  static List = List
}

export default Menu
