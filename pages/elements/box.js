import {Html} from '../../src'
import {Layouts, Box} from '../../bulma'


export default () => {
  return {
    layout: Layouts.Columns,
    defaultItem: {
      as: Box,
      text: "I'm a Box"
    },
    items: [{
    }, {
      css: 'has-text-primary',
    }, {
      css: 'has-background-info has-text-light',
    }, {
      css: 'is-warning'
    }]

  }
}
