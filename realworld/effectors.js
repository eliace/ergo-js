
import axios from 'axios'

function getArticles (watch) {
  const eff = function () {
    return {
      resolver: () => {
        return axios.get('https://conduit.productionready.io/api/articles')
          .then(response => response.data)
      },
      done: (data, effect) => {
        effect.source.set(data.articles)
      }
    }
  }
  eff.watch = watch || ((evt) => evt.name == 'init')
  return eff
}

function getTags (watch) {
  const eff = function () {
    return {
      resolver: () => {
        return axios.get('https://conduit.productionready.io/api/tags')
          .then(response => response.data)
      },
      done: (data, effect) => {
        effect.source.set(data.tags)
      }
    }
  }
  eff.watch = watch || ((evt) => evt.name == 'init')
  return eff
}


export {getArticles, getTags}
