import {Html} from '../../src'
import {List} from '../elements'

class MenuLabel extends Html {
  config () {
    return {
      html: 'p',
      as: 'menu-label'
    }
  }
}

class MenuItem extends Html {
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
        initOrSet: function(v) {
  //        console.log('set selected', this, v)
          this.$content.opt('classes', {'is-active': !!v})//opt('classes', {'is-active': v})
        }
      }
    }
  }
}

class MenuList extends List {
  config () {
    return {
      as: 'menu-list',
      defaultItem: {
        base: MenuItem
      },
      defaultComponent: {
        base: MenuItem
      }
    }
  }
}

class MenuSubList extends List {
  config () {
    return {
      defaultItem: {
        base: MenuItem
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
}

Menu.Label = MenuLabel
Menu.List = MenuList
Menu.SubList = MenuSubList

export default Menu
