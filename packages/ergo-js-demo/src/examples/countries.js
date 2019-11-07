import {Html} from 'chorda-core'
import {Layouts} from 'chorda-bulma'
import {Mutate} from '../helpers'

const api = {
  getCountries: function () {
    return fetch('https://restcountries.eu/rest/v2/all')
      .then(response => response.json())
  }
}


export default () => {
  return {
    layout: Layouts.Container,
    dataId: 'countries',
    allJoined: function ({data}) {
      const loadCountries = data.createEffect('loadCountries', async () => {
        data.set([])
        const v = await api.getCountries()
        const t0 = new Date().getTime()
        console.log('result', v)
        data.set(v)
        const t1 = new Date().getTime()
        console.log('t', t1 - t0)
      }, this)

      data.watch(e => e.name == 'init', () => {
        loadCountries()
      }, this)

//      if (data.$isEmpty()) {
//      }
    },
    // dataChanged: function(v, key) {
    //   if (v == null) {
    //     const loadAllCountries = function () {
    //       return fetch('https://restcountries.eu/rest/v2/all')
    //         .then(response => response.json())
    //     }
    //     const effects = [{
    //       name: 'fetch',
    //       resolver: loadAllCountries,
    //       mode: 'pre'
    //     }]
    //     this.sources[key].wait(effects).emit('set', null)
    //
    //     // const FetchAllCountries = {
    //     //   name: 'fetch',
    //     //   use: () => {
    //     //     return fetch('https://restcountries.eu/rest/v2/all')
    //     //     .then(response => response.json())
    //     //   }
    //     // }
    //     //
    //     // this.domains[dn].when(FetchAllCountries).emit('set').then()
    //
    //     // console.log('start loading countries.')
    //     // source.set({loading: true})
    //     // fetch('https://restcountries.eu/rest/v2/all')
    //     //   .then(response => response.json())
    //     //   .then(json => {
    //     //     console.log('end loading countries.', json)
    //     //     source.set(json)
    //     //     projector.scheduleRender()
    //     //   })
    //   }
    // },
    // stateEffects: function (event) {
    //   console.log(event)
    //   if (event.name == 'fetch:done') {
    //     projector.scheduleRender()
    //   }
    // },
    // stateEffects: function (effect) {
    //   if (effect.status == 'wait') {
    //     console.log('begin effect', effect.event, effect.context)
    //   }
    //   else if (effect.status == 'error') {
    //     console.log('failed effect', effect.event, effect.context)
    //   }
    //   else if (effect.status == 'done') {
    //     console.log('end effect', effect.context, 'of', effect.event)
    //     projector.scheduleRender()
    //   }
    //   else {
    //     console.log ('effect', effect)
    //   }
    // },
    $table: {
      html: 'table',
      css: 'table',
      $header: {
        html: 'thead',
        defaultItem: {
          html: 'tr',
          defaultItem: {
            html: 'th'
          }
        },
        items: [{
          items: ['Name', 'Capital', 'Region', 'Area', 'Population', 'Flag']
        }]
      },
      $body: {
        html: 'tbody',
        dataChanged: Mutate.Items,
        dataEntryId: (v) => v.alpha3Code,
//            stateItems: Custom.All,
        defaultItem: {
          html: 'tr',
          defaultItem: {
            html: 'td',
            dataChanged: Mutate.Text
          },
          items: [{
            dataId: 'name'
//            format: (v) => v.name
          }, {
            dataId: 'capital'
//            format: (v) => v.capital
          }, {
            dataId: 'region'
//            format: (v) => v.region
          }, {
            dataId: 'area'
//            format: (v) => v.area
          }, {
            dataId: 'population'
//            format: (v) => v.population
          }, {
            $content: {
              html: 'img',
              height: '1rem',
              dataId: 'flag',
              dataChanged: Mutate.Src
            },
            dataChanged: false
          }]
        }
      }
    }
  }
}
