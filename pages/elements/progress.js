import {Html} from '../../src'
import {Layouts, Progress} from '../../bulma'


export default () => {
  return {
    layout: Layouts.Rows,
    width: 400,
    items: [{
      base: Progress,
      value: 40
    }, {
      defaultItem: {
        base: Progress
      },
      items: [
        {value: 30, as: 'is-primary'},
        {value: 35, as: 'is-link'},
        {value: 40, as: 'is-info'},
        {value: 45, as: 'is-success'},
        {value: 50, as: 'is-warning'},
        {value: 55, as: 'is-danger'},
      ]
    }, {
      defaultItem: {
        base: Progress,
        height: 3
      },
      items: [
        {value: 30, as: 'is-primary'},
        {value: 40, as: 'is-link'},
        {value: 50, as: 'is-info'},
      ]
    }]
  }
}
