import {Html, Source} from 'chorda-core'
import {Layouts, Table} from 'chorda-bulma'

import {COUNTRIES} from '../constants'


export default () => {
  return {
    layout: Layouts.Rows,
    items: [{
      as: Table,
      $colgroup: {
        items: [{},{},{},{}]
      },
      $head: {
        items: [{items: ['Name', 'Native name', 'Alpha3', 'Capital']}]
      },
      $body: {
        items: COUNTRIES.slice(0, 6).map(c => {return {items: [c.name, c.nativeName, c.alpha3Code, c.capital]}})
      },
      $foot: {
        html: 'tfoot',
        defaultItem: {
          as: Table.Row,
          defaultItem: {
            html: 'th'
          }
        },
        items: [{items: ['Name', 'Native name', 'Alpha3', 'Capital']}]
      }
    }]
  }
}
