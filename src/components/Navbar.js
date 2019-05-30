import {Html} from '../core'


class Brand extends Html {
  static defaultOpts = {
    class: 'navbar-brand'
  }
}

class Menu extends Html {
  static defaultOpts = {
    class: 'navbar-menu'
  }
}


class Item extends Html {
  static defaultOpts = {
    html: 'a',
    class: 'navbar-item'
  }
}

class Start extends Html {
  static defaultOpts = {
    class: 'navbar-start'
  }
}

class End extends Html {
  static defaultOpts = {
    class: 'navbar-end'
  }
}


class Navbar extends Html {
  static defaultOpts = {
    html: 'nav',
    class: 'navbar'
  }

  static Brand = Brand
  static Menu = Menu
  static Start = Start
  static End = End
  static Item = Item
}

export default Navbar
