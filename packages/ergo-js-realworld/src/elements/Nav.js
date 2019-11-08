import {Html, Layout, Source} from 'chorda-core'

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
        set: function (v) {
          this.$content.opt('classes', {'disabled': v})
        }
      },
      active: {
        set: function (v) {
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
