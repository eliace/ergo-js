import {Html} from 'chorda-core'
import {Layouts, Progress} from 'chorda-bulma'


export default () => {
  return {
    layout: Layouts.Rows,
    width: 400,
    items: [{
      as: Progress,
      value: 40
    }, {
      defaultItem: {
        as: Progress
      },
      items: [
        {value: 30, css: 'is-primary'},
        {value: 35, css: 'is-link'},
        {value: 40, css: 'is-info'},
        {value: 45, css: 'is-success'},
        {value: 50, css: 'is-warning'},
        {value: 55, css: 'is-danger'},
      ]
    }, {
      defaultItem: {
        as: Progress,
        height: 3
      },
      items: [
        {value: 30, css: 'is-primary'},
        {value: 40, css: 'is-link'},
        {value: 50, css: 'is-info'},
      ]
    }]
  }
}
