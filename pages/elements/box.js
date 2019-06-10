import {Html, Layouts, Box} from '../../src'


export default (projector) => {
  return {
    layout: Layouts.Columns,
    defaultItem: {
      type: Box,
      text: "I'm the Box"
    },
    items: [{
    }, {
      as: 'has-text-primary',
    }, {
      as: 'has-background-info has-text-light',
    }, {
      as: 'is-warning'
    }]

  }
}
