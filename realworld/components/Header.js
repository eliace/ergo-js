import {Html} from '../../src'

const IF = {
  HasIonClass: function (o) {
    if (o.classes) {
      return Object.keys(o.classes).filter(cls => cls.startsWith('ion-')).length > 0
    }
    return false
  }
}

export default () => {
  return {
    html: 'nav',
    as: 'navbar navbar-light',
    $container: {
      as: 'container',
      $brand: {
        html: 'a',
        as: 'navbar-brand',
        href: 'index.html',
        text: 'conduit'
      },
      $nav: {
        html: 'ul',
        as: 'nav navbar-nav pull-xs-right',
        defaultItem: {
          html: 'li',
          as: 'nav-item',
          $content: {
            html: 'a',
            as: 'nav-link',
            href: '',
            $icon: {
              html: 'i',
              render: IF.HasIonClass
            }
          },
          dynamicOptions: {
            icon: {
              init: function (v) {
                this.$content.$icon.opt('classes', {['ion-'+v]: true})
              }
            }
          }
        },
        items: [{
          text: 'Home'
        }, {
          text: ' New Post',
          icon: 'compose'
        }, {
          text: ' Settings',
          icon: 'gear-a'
        }, {
          text: 'Sign up'
        }]
      }
    }
  }
}
