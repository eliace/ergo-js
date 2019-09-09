//import {createProjector} from 'maquette'
import {Html, Domain, Config} from '../src'
import {Router} from 'director/build/director'
import Context from '../src/react/Context'

import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
// import SignUp from './pages/SignUp'
// import SignIn from './pages/SignIn'
// import Profile from './pages/Profile'
import Settings from './pages/Settings'
// import Edit from './pages/Edit'
// import Article from './pages/Article'

import {getUser} from './api'

const LOG = (e) => {console.log(e)}

//import {getArticle, getProfile, getUser} from './effectors'

// const projector = createProjector()
//
// const render = () => {
//   return app.render()
// }
//
// document.addEventListener('DOMContentLoaded', function () {
//   projector.append(document.body, render);
// });

document.addEventListener('DOMContentLoaded', function () {
  Config.Renderer.append(app, document.getElementById('app'))
})


const routes = {
  '/': function () {page.setCurrent('home')}, //{page.set('current', 'home')},
  '/login': function () {page.set('current', 'signIn')},
  '/register': function () {page.set('current', 'signUp')},
  '/settings': function () {page.setCurrent('settings')},
  '/editor': function () {page.setCurrent('edit')},
  '/editor/:slug': function () {page.set('current', 'edit')},
  '/article/:slug': function (slug) {
    page.set('slug', slug)
    page.setCurrent('article')
//    data.loadArticle(slug)
//    page.mergeWith({current: ''})
  },
  '/@:username': function (username) {
    page.set('username', username)
    page.setCurrent('profile')
    // data.loadProfile(username)
    // page.mergeWith({current: '', username})
  },
//  '/profile/:username/favorites': function () {page.set('current', 'profile')},
}

const routerConfig = {
  // before: function () {
  //   const t = token.get()
  //   const user = page.get('user')
  //   if (!user) {
  //     // TODO здесь нужно разделение страниц на те, к которым нужна авторизация
  //     if (t) {
  //       page.loadUser(t)
  //     }
  //   }
  // }
}

const _router = new Router(routes). configure(routerConfig)


const page = new Domain({
  current: null,
}, {
  properties: {
    home: v => v.current == 'home',
    signIn: v => v.current == 'signIn',
    signUp: v => v.current == 'signUp',
    settings: v => v.current == 'settings',
    edit: v => v.current == 'edit',
    article: v => v.current == 'article',
    profile: v => v.current == 'profile',
    header: v => !!v.current,
    footer: v => !!v.current
  },
  actions: {
    setCurrent: function (v) {
      this.set('current', v)
    },
    loadUser: async function (token) {
      const v = await getUser(token)
      this.set('user', v.user)
    }
  },
  watchers: { LOG }
})

const data = new Domain({

}, {

})

const token = new Domain(localStorage.getItem('token'), {
  changed: function (evt) {
    if (evt.name == 'changed') {
//      console.log('change token', evt.data)
      localStorage.setItem('token', evt.data)
    }
  }
})


const app = new Html({
  sources: {
    page,
    data,
    router: {

    },
    token
  },
  $header: Header,
  // $article: Article,
  // $edit: Edit,
  $settings: Settings,
  // $profile: Profile,
  $home: Home,
  // $signUp: SignUp,
  // $signIn: SignIn,
  $footer: Footer,
  components: false,
  pageChanged: function (v, k, page) {
    this.opt('components', page.$stream(k))
  },
  allJoined: function ({page, token}) {
    const { setCurrent } = page.actions
    // page.$watch('init', this, () => {
    //   if (!page.get('user') && token.get()) {
    //     return page.loadUser(token.get())
    //   }
    // })
    page.$effect({
      when: e => e.name == setCurrent.on,
      on: (e) => {
        if (!page.get('user') && token.get()) {
          return page.loadUser(token.get())
        }
      },
      fail: () => {
        console.log('error auth')
      }
    }, 'auth', this)
  },
  sourcesBound: function ({data, page, router, token}) {

    // методы
    data.effect('loadArticle', this, async slug => {
      const v = await getArticle(slug)
      data.set('article', v.article)
    })
    data.effect('loadProfile', this, async username => {
      const v = await getProfile(username)
      data.set('profile', v.profile)
    })

    page.effect('setCurrent', this, k => {
      page.set('current', k)
    })
    page.effect('loadUser', this, async (token) => {
      const v = await getUser(token)
      page.set('user', v.user)
    })

    // эффекты
    page.watch(page.setCurrent.init, this, (e) => {
      if (e.params[0] == 'article') {
        return data.loadArticle(page.get('slug')) // возможно, правильнее брать из роутера
      }
      else if (e.params[0] == 'profile') {
        return data.loadProfile(page.get('username'))
      }
      // else if (e.params[0] == 'settings') {
      //   return page.loadUser(token.get())
      // }
    })
    page.watch(page.setCurrent.init, this, (e) => {
      if (!page.get('user') && token.get()) {
        return page.loadUser(token.get())
      }
    })
  },
  pageMethods: {
//    loadUser: getUser,
//     setCurrent: function (v) {
//       const {page, token} = this.domain
//       page.set('current', v)
// //       debugger
// //       if (!page.get('user') && token.get()) {
// // //        console.log(token.get())
// //         return page.loadUser(token.get())
// //       }
//     },
    logout: function () {
      const {token, page, router} = this.domain
      token.set('')
      page.set('user', null)
      router.toHome()
    },
    login: function (user) {
      const {token, page, router} = this.domain
      token.set(user.token)
      page.set('user', user)
      router.toHome()
    }
  },
  pageEvents: function (e) {
    console.log('[index] page', e)
  },
  dataEvents: function (e) {
    console.log('[index] data', e)
  },
  routerMethods: {
    toProfile: function () {
      page.set('current', 'profile')
    },
    toHome: function () {
      window.location.assign('/#/')
    }
  }
})

_router.init()

window._app = app
