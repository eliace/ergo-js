import {Html, Layout, Source} from '../../src'

class NavItem extends Html {
  config () {
    return {
      html: 'li',
      css: 'nav-item',
      $content: {
        html: 'a',
        css: 'nav-link',
        href: ''
      }
    }
  }
  options () {
    return {
      disabled: {
        initOrSet: function (v) {
          this.$content.opt('classes', {'disabled': v})
        }
      },
      active: {
        initOrSet: function (v) {
          this.$content.opt('classes', {'active': v})
        }
      }
    }
  }
}


class Nav extends Html {
  config () {
    return {
      html: 'ul',
      css: 'nav',
      defaultItem: {
        as: NavItem
      }
    }
  }
}

Nav.Item = NavItem

export default Nav
