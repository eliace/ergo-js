import {Html} from '../../src'


class Brand extends Html {
  static defaultOpts = {
    as: 'navbar-brand'
  }
}

class Menu extends Html {
  static defaultOpts = {
    as: 'navbar-menu'
  }
}


class Item extends Html {
  static defaultOpts = {
    html: 'a',
    as: 'navbar-item'
  }
}

class Start extends Html {
  static defaultOpts = {
    as: 'navbar-start'
  }
}

class End extends Html {
  static defaultOpts = {
    as: 'navbar-end'
  }
}


class Navbar extends Html {
  static defaultOpts = {
    html: 'nav',
    as: 'navbar'
  }

  static Brand = Brand
  static Menu = Menu
  static Start = Start
  static End = End
  static Item = Item
}

export default Navbar
