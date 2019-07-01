import axios from 'axios'

function _effector (name='') {
  const f = function () {
    return {...f.eff, name}
  }
  const p = {
    init: function (callback) {this.eff.init = callback; return this},
    ready: function (callback) {this.eff.ready = callback; return this},
    done: function (callback) {this.eff.done = callback; return this},
    cancel: function (callback) {this.eff.cancel = callback; return this},
    fail: function (callback) {this.eff.fail = callback; return this},
    use: function (callback) {this.eff.resolver = callback; return this},
    activate: function (callback) {this.eff.activator = callback; return this},
    when: function (callback) {this.watch = callback; return this},
  }
  Object.setPrototypeOf(p, Function)
  Object.setPrototypeOf(f, p)
  f.eff = {}
  return f
}




class EffectorFunc extends Function {
  constructor (name='', eff={}) {
    const f = function (...params) {
      return f._effData.use.apply(this, params)
//      console.log('f', f._effData, params)
    }
    Object.setPrototypeOf(f, new.target.prototype)
    f._effName = name
    f._effData = eff
    return f
  }

  use (fn) {
    return new EffectorFunc(this._effName, {...this._effData, use: fn})
  }

  watch (event, callback) {
    const watchers = (this._effData.watchers || []).splice(0)
    watchers.push({event, callback})
    return new EffectorFunc(this._effName, {...this._effData, watchers})
  }

  get ready () {
    return '@'+this._effName
  }

  get done () {
    return '@'+this._effName+':done'
  }

  get fail () {
    return '@'+this._effName+':fail'
  }

  get finals () {
    return {['@'+this._effName+':done']: true}
  }

}


function effector (name) {
  return new EffectorFunc(name)
}



// const load = effector('load').use(() => {
//   return axios.get('https://conduit.productionready.io/api/articles')
//     .then(response => response.data)
// })
//
// console.log(load('x'))

// export function getArticles (watch) {
//   const eff = function () {
//     return {
//       resolver: () => {
//         return axios.get('https://conduit.productionready.io/api/articles')
//           .then(response => response.data)
//       },
//       done: (data, effect) => {
//         effect.source.set(data.articles)
//       }
//     }
//   }
//   eff.watch = watch || ((evt) => evt.name == 'init')
//   return eff
// }
//
// export function getTags (watch) {
//   const eff = function () {
//     return {
//       resolver: () => {
//         return axios.get('https://conduit.productionready.io/api/tags')
//           .then(response => response.data)
//       },
//       done: (data, effect) => {
//         effect.source.set(data.tags)
//       }
//     }
//   }
//   eff.watch = watch || ((evt) => evt.name == 'init')
//   return eff
// }

const getArticles = effector('fetch_articles')

getArticles.ByTag = getArticles
  .use((tag) => {
    return axios.get('https://conduit.productionready.io/api/articles?tag='+tag)
      .then(response => response.data)
  })

getArticles.All = getArticles
  .use((tag) => {
    return axios.get('https://conduit.productionready.io/api/articles')
      .then(response => response.data)
  })

getArticles.ByAuthor = getArticles
  .use((author) => {
    return axios.get('https://conduit.productionready.io/api/articles?author='+author)
      .then(response => response.data)
  })

getArticles.Favorited = getArticles
  .use((username) => {
    return axios.get('https://conduit.productionready.io/api/articles?favorited='+username)
      .then(response => response.data)
  })


export {getArticles}

export const getTags = effector('fetch_tags')
  .use(() => {
    return axios.get('https://conduit.productionready.io/api/tags')
      .then(response => response.data)
  })

export const getArticle = effector('fetch_article')
  .use((slug) => {
    return axios.get('https://conduit.productionready.io/api/articles/'+slug)
      .then(response => response.data)
  })

export const getComments = effector('fetch_comments')
  .use(slug => {
    return axios.get('https://conduit.productionready.io/api/articles/'+slug+'/comments')
      .then(response => response.data)
  })

export const getProfile = effector('fetch_profile')
  .use(username => {
    return axios.get('https://conduit.productionready.io/api/profiles/'+username)
      .then(response => response.data)
  })

export const sendRegister = effector('send_register')
  .use(data => {
    return axios.post('https://conduit.productionready.io/api/users', {user: data})
      .then(response => response.data)
      .catch(err => {throw err.response.data})
  })

export const sendLogin = effector('send_login')
  .use(data => {
    return axios.post('https://conduit.productionready.io/api/users/login', {user: data})
      .then(response => response.data)
      .catch(err => {throw err.response.data})
  })

export const getUser = effector('fetch_user')
  .use(token => {
    return axios.get('https://conduit.productionready.io/api/user', {headers: {Authorization: 'Token '+token}})
      .then(response => response.data)
  })

//export {getArticles, getTags}
