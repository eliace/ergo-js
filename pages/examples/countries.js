import {Html} from '../../src'
import {Layouts} from '../../bulma'
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
    allBound: function ({data}) {
      const loadCountries = data.$method('loadCountries', this, async () => {
        data.set([])
        const v = await api.getCountries()
        const t0 = new Date().getTime()
        console.log('result', v)
        data.set(v)
        const t1 = new Date().getTime()
        console.log('t', t1 - t0)
      })

      data.watch(e => e.name == 'init', this, () => {
        data.loadCountries()
      })

//      if (data.isEmpty()) {
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
      as: 'table',
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
        dataChanged: Mutate.DynamicItems,
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
            $img: {
              html: 'img',
              height: '1rem',
              dataId: 'flag',
              dataChanged: Mutate.Src
            }
          }]
        }
      }
    }
  }
}
