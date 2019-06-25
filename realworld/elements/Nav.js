import {Html, Layout, Source} from '../../src'

class NavItem extends Html {
  static defaultOpts = {
    html: 'li',
    as: 'nav-item',
    $content: {
      html: 'a',
      as: 'nav-link',
      href: ''
    }
  }
  static OPTIONS = {
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


export default class Nav extends Html {
  static defaultOpts = {
    html: 'ul',
    as: 'nav',
    defaultItem: {
      type: NavItem
    }
  }
  static Item = NavItem
}
