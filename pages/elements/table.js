import {Html, Source} from '../../src'
import {Layouts, Table} from '../../bulma'

import {COUNTRIES} from '../constants'

// console.log(
//   new Source(COUNTRIES)
//   .asStream()
//   .filter(v => v.name[0] == 'A')
//   .range(3, 4)
//   .map(v => v.nativeName)
//   .forEach((v => console.log(v)))
//   .first()
//   .get('alpha3Code')
// )

//console.log(COUNTRIES.slice(0, 10).map(c => {items: [c.name, c.nativeName, c.alpha3Code, c.capital]}))

export default () => {
  return {
    layout: Layouts.Rows,
    items: [{
      base: Table,
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
          base: Table.Row,
          defaultItem: {
            html: 'th'
          }
        },
        items: [{items: ['Name', 'Native name', 'Alpha3', 'Capital']}]
      }
    }]
  }
}
