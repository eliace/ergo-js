import {Html, Domain} from '../../src'
import {Layouts, Tabs, Image} from '../../bulma'

import axios from 'axios'

const api = {
  cats: {
    getBreeds: function () {
      return axios.get('https://api.thecatapi.com/v1/breeds').then(response => response.data)
    },
    getImage: function (breedId) {
      return axios.get('https://api.thecatapi.com/v1/images/search?breed_id='+breedId).then(response => response.data[0])
    }
  },
  dogs: {
    getBreeds: function () {
      return axios.get('https://dog.ceo/api/breeds/list/all').then(response => {
        return Object.keys(response.data.message).sort().map(v => {return {id: v, name: v}})
      })
    },
    getImage: function (breedId) {
      return axios.get(`https://dog.ceo/api/breed/${breedId}/images`).then(response => {
        return response.data.message.map(v => {return {url: v}})[0]
      })
    }
  }
}

export default () => {
  return {
    $content: {
      layout: Layouts.Container,
      $tabs: {
        as: Tabs,
        css: 'is-centered',
        tabs: [{text: 'Breeds', selected: true}, 'Images/Search', 'Random image']
      },
      $breedSelect: {
        html: 'select',
        defaultItem: {
          html: 'option',
          dataChanged: function (v) {
            this.opt('text', v.name)
            this.opt('value', v.id)
            this.opt('key', v.id)
          }
        },
        dataId: 'breeds',
        dataChanged: function (v, k, s) {
          this.opt('items', k)
        },
        viewChanged: function (v) {
          this.opt('value', v.breedId)
        },
        onChange: function (e, {view}) {
          view.actions.selectBreed(e.target.value)
        }
      },
      $breedGallery: {
        $image: {
          as: Image,
          width: 512,
          dataId: 'image',
          dataChanged: function (v) {
            this.opt('src', v && v.url)
          }
        }
      }
    },
    sources: {
      view: new Domain({pet: 'cats'}),
      data: new Domain({})
    },
    allJoined: function ({view, data}) {
      view.watch(e => e.name == 'init', async () => {
        data.set('breeds',  await api.cats.getBreeds())
      }, this)
      view.createAction('selectBreed', async (id) => {
        view.set('breedId', id)
        data.set('image', await api.cats.getImage(id))
      })
    }
  }
}
