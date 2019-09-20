import {Html, Domain, Layout} from '../../src'
import {Layouts, Pagination} from '../../bulma'




export default () => {
  return {
    layout: Layouts.Rows,
    items: [{
      as: Pagination,
      min: 1,
      max: 9,
      current: 8
    }, {
      as: Pagination,
      css: 'is-centered',
      min: 1,
      max: 86,
      current: 46
    }, {
      as: Pagination,
      css: 'is-centered is-small',
      min: 1,
      max: 86,
      current: 46
    }]
  }
}
