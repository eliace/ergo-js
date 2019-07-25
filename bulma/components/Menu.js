import {Html} from '../../src'

class Label extends Html {
  config () {
    return {
      html: 'p',
      as: 'menu-label'
    }
  }
}

class Item extends Html {
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
        set: function(v) {
  //        console.log('set selected', this, v)
          this.$content.opt('classes', {'is-active': !!v})//opt('classes', {'is-active': v})
        }
      }
    }
  }
}

class List extends Html {
  config () {
    return {
      as: 'menu-list',
      defaultItem: {
        type: Item
      },
      defaultComponent: {
        type: Item
      }
    }
  }
}

class Menu extends Html {
  config () {
    return {
      html: 'aside',
      as: 'menu'
    }
  }

  static Label = Label
  static List = List
}

export default Menu
