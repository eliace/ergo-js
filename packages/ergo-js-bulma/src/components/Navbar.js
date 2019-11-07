import {Html} from 'chorda-core'


class Brand extends Html {
  config () {
    return {
      css: 'navbar-brand'
    }
  }
}

class Menu extends Html {
  config () {
    return {
      css: 'navbar-menu'
    }
  }
}


class Item extends Html {
  config () {
    return {
      html: 'a',
      css: 'navbar-item'
      }
  }
}

class Start extends Html {
  config () {
    return {
      css: 'navbar-start'
    }
  }
}

class End extends Html {
  config () {
    return {
      css: 'navbar-end'
    }
  }
}


class Navbar extends Html {
  config () {
    return {
      html: 'nav',
      css: 'navbar'
    }
  }
}

Navbar.Brand = Brand
Navbar.Menu = Menu
Navbar.Start = Start
Navbar.End = End
Navbar.Item = Item

export default Navbar
