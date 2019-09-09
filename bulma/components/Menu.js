import {Html} from '../../src'
import {List} from '../elements'

class MenuLabel extends Html {
  config () {
    return {
      html: 'p',
      css: 'menu-label'
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
      css: 'menu-list',
      defaultItem: {
        as: MenuItem
      },
      defaultComponent: {
        as: MenuItem
      }
    }
  }
}

class MenuSubList extends List {
  config () {
    return {
      defaultItem: {
        as: MenuItem
      }
    }
  }
}


class Menu extends Html {
  config () {
    return {
      html: 'aside',
      css: 'menu'
    }
  }
}

Menu.Label = MenuLabel
Menu.List = MenuList
Menu.SubList = MenuSubList

export default Menu
