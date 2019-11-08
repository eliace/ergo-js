import axios from 'axios'

export function getAllArticles () {
  return axios.get('https://conduit.productionready.io/api/articles')
    .then(response => response.data)
}

export function getTags () {
  return axios.get('https://conduit.productionready.io/api/tags')
    .then(response => response.data)
}

export function getArticlesByTag (tag) {
  return axios.get('https://conduit.productionready.io/api/articles?tag='+tag)
    .then(response => response.data)
}

export function getUser (token) {
  return axios.get('https://conduit.productionready.io/api/user', {headers: {Authorization: 'Token '+token}})
    .then(response => response.data)
}

export function getComments (slug) {
  return axios.get('https://conduit.productionready.io/api/articles/'+slug+'/comments')
    .then(response => response.data)
}

export function getArticle (slug) {
  return axios.get('https://conduit.productionready.io/api/articles/'+slug)
    .then(response => response.data)
}