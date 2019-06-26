import axios from 'axios'

function effector (name='') {
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

export const getTags = effector()
  .use(() => {
    return axios.get('https://conduit.productionready.io/api/tags')
      .then(response => response.data)
  })

export const getArticles = effector()
  .use(() => {
    return axios.get('https://conduit.productionready.io/api/articles')
      .then(response => response.data)
  })

//export {getArticles, getTags}
