import {Layouts, Box} from 'chorda-bulma'


export default () => {
    return {
        layout: Layouts.Columns,
        defaultItem: {
          as: Box,
          text: "I'm a Box"
        },
        items: [{
        }, {
          css: 'has-text-info',
        }, {
          css: 'has-background-primary has-text-light',
        }, {
          css: 'has-background-warning'
        }]
    }
}