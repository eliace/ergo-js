import {Html} from '../core'

class Label extends Html {
  configDefaults () {
    return {
      html: 'p',
      as: 'menu-label'
    }
  }
}

class Item extends Html {
  configDefaults () {
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
  configDefaults () {
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
  configDefaults () {
    return {
      html: 'aside',
      as: 'menu'
    }
  }

  static Label = Label
  static List = List
}

export default Menu
