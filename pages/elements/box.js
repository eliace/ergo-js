import {Html} from '../../src'
import {Layouts, Box} from '../../bulma'


export default () => {
  return {
    layout: Layouts.Columns,
    defaultItem: {
      base: Box,
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
