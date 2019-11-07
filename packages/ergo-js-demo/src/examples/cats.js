import {Html, Domain} from 'chorda-core'

import axios from 'axios'

const api = {
  getRandomCat: function () {
    return axios.get('https://aws.random.cat/meow').then(response => response.data)
  }
}

class Cats extends Domain {
  config () {
    return {
      actions: {
        nextCat: async () => {
          this.set(await api.getRandomCat())
        }
      }
    }
  }
}

class View extends Domain {
  config () {
    return {
      properties: {
        image: (v) => !v.loading
      }
    }
  }
}

export default () => {
  return {
    sources: {
      cats: new Cats({}),
      view: new View({})
    },
    allJoined: function ({view, cats}) {
      // cats.watch(e => e.name == 'nextCat', () => {
      //   view.set('loading', true)
      // }, this)
      // cats.watch(e => e.name == 'fetch' && e.channel == 'done', () => {
      //   view.set('loading', false)
      // }, this)
      cats.on('nextCat', () => {
        view.set('loading', true)
      }, this, ['start'])
      cats.on('nextCat', () => {
        view.set('loading', false)
      }, this, ['done'])
    },
    components: {
      error: false,
      loading: false
    },
    viewChanged: function (v, s) {
      this.opt('components', s)
    },
    $button: {
      html: 'button',
      text: 'Show Cat',
      onClick: function (e, {cats}) {
        cats.actions.nextCat()
      }
    },
    $error: {
      html: 'p',
      text: 'Error, try again'
    },
    $loading: {
      html: 'p',
      text: 'Loading...'
    },
    $image: {
      html: 'p',
      $content: {
        html: 'img',
        catsId: 'file',
        catsChanged: function (v) {
          this.opt('src', v)
        }
      }
    }
  }
}
