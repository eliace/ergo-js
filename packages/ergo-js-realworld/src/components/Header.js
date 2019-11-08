import {Html, Domain} from 'chorda-core'
import {Mutate} from '../utils'

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
    // SCOPE
    scope: {
      view: (ctx) => ctx.page
    },
    viewJoined: function (s) {
      s.createProperty('menu', {
        calc: (v) => {
          const isAuth = !!v.user
          return {
            home: true,
            newArticle: isAuth,
            settings: isAuth,
            signIn: !isAuth,
            signUp: !isAuth,
            profile: isAuth  
          }
        }
      })
    },
    // TEMPLATE
    html: 'nav',
    weight: -10,
    css: 'navbar navbar-light',
    $container: {
      css: 'container',
      $brand: {
        html: 'a',
        css: 'navbar-brand',
        href: '/#/',
        text: 'conduit'
      },
      $nav: {
        scope: {
          view: ctx => ctx.view.$entry('menu')
        },
        html: 'ul',
        css: 'nav navbar-nav pull-xs-right',
        viewChanged: function (v, s) {
          this.opt('components', s)
        },
        defaultComponent: {
          html: 'li',
          css: 'nav-item',
          $content: {
            html: 'a',
            css: 'nav-link',
            href: '',
            $icon: {
              html: 'i',
//              render: IF.HasIonClass
            },
            components: {
              icon: false
            }
          },
          options: {
            icon: {
              set: function (v) {
                this.$content.opt('components', {icon: true})
                this.$content.$icon.opt('classes', {['ion-'+v]: true})
              }
            },
            linkTo: {
              set: function (v) {
                this.$content.opt('href', v)
              }
            },
            active: {
              set: function (v) {
                this.$content.opt('classes', {'active': v})
              }
            }
          },
          viewChanged: function (v) {
            this.opt('active', v.current == this.options.key)
          }
        },
        $home: {
          text: 'Home',
          linkTo: '/#/',
          key: 'home'
        },
        $newArticle: {
          text: ' New Article',
          icon: 'compose',
          linkTo: '/#/editor',
          key: 'edit'
        },
        $settings: {
          text: ' Settings',
          icon: 'gear-a',
          linkTo: '/#/settings',
          key: 'settings'
        },
        $signUp: {
          text: 'Sign up',
          linkTo: '/#/register',
          key: 'signUp'
        },
        $signIn: {
          text: 'Sign in',
          linkTo: '/#/login',
          key: 'signIn'
        },
        $profile: {
          key: 'profile',
//          linkTo: '/#/profile'
          viewChanged: function (v) {
            // console.log('data', this.domain.data.get())
            // this.opt('text', v.user.username)
            // this.opt('linkTo', '/#/@'+v.user.username)
            // this.opt('active', v.current == this.options.key && v.username == v.user.username)
          }
        },
      }
    }
  }
}
