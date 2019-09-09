import {Html} from '../../src'


class Brand extends Html {
  static defaultOpts = {
    css: 'navbar-brand'
  }
}

class Menu extends Html {
  static defaultOpts = {
    css: 'navbar-menu'
  }
}


class Item extends Html {
  static defaultOpts = {
    html: 'a',
    css: 'navbar-item'
  }
}

class Start extends Html {
  static defaultOpts = {
    css: 'navbar-start'
  }
}

class End extends Html {
  static defaultOpts = {
    css: 'navbar-end'
  }
}


class Navbar extends Html {
  static defaultOpts = {
    html: 'nav',
    css: 'navbar'
  }

  static Brand = Brand
  static Menu = Menu
  static Start = Start
  static End = End
  static Item = Item
}

export default Navbar
