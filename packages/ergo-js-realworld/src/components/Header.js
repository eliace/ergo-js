import {Html, Domain} from '../../src'
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
    sources: {
      data: {
        menu: {}
      }
    },
    // pageComputed: {
    //   menu: v => {
    //     return {
    //       newArticle: !!v.user,
    //       settings: !!v.user,
    //       signIn: !v.user,
    //       signUp: !v.user
    //     }
    //   }
    // },
//     pageChanged: function (v) {
// //      console.log(v)
//     },
    pageEvents: function (e) {
      const {page, data} = this.domain
      if ((e.name == 'init' || e.name == 'changed')/* && e.ids && ('user' in e.ids)*/) {
        const v = page.get()
        data.set('menu', {
          home: true,
          newArticle: !!v.user,
          settings: !!v.user,
          signIn: !v.user,
          signUp: !v.user,
          profile: !!v.user
        })
      }
    },
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
        html: 'ul',
        css: 'nav navbar-nav pull-xs-right',
//        pageId: 'menu',
        defaultComponent: {
          html: 'li',
          css: 'nav-item',
          $content: {
            html: 'a',
            css: 'nav-link',
            href: '',
            $icon: {
              html: 'i',
              render: IF.HasIonClass
            }
          },
          options: {
            icon: {
              init: function (v) {
                this.$content.$icon.opt('classes', {['ion-'+v]: true})
              }
            },
            linkTo: {
              initOrSet: function (v) {
                this.$content.opt('href', v)
              }
            },
            active: {
              initOrSet: function (v) {
                this.$content.opt('classes', {'active': v})
              }
            }
          },
          pageChanged: function (v) {
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
          pageChanged: function (v) {
            // console.log('data', this.domain.data.get())
            // this.opt('text', v.user.username)
            // this.opt('linkTo', '/#/@'+v.user.username)
            // this.opt('active', v.current == this.options.key && v.username == v.user.username)
          }
        },
        dataId: 'menu',
        dataChanged: Mutate.Components
      }
    }
  }
}