import {Html, Domain} from 'chorda-core'
import {Layouts, Tabs, Image, Carousel, Box} from 'chorda-bulma'

import axios from 'axios'

const api = {
    getBreeds: function () {
      return axios.get('https://dog.ceo/api/breeds/list/all').then(response => {
        return Object.keys(response.data.message).sort().map(v => {return {id: v, name: v}})
      })
    },
    getImages: function (breedId) {
      return axios.get(`https://dog.ceo/api/breed/${breedId}/images`).then(response => {
        return response.data.message.map(v => {return {url: v}})
      })
    }
}
