import {Html, Layouts, Progress} from '../../src'


export default (projector) => {
  return {
    layout: Layouts.Rows,
    width: 400,
    items: [{
      type: Progress,
      value: 40
    }, {
      defaultItem: {
        type: Progress
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
        type: Progress,
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
