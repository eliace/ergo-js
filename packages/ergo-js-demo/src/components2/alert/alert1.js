import {Layouts, Alert} from 'chorda-bulma'

import {LOREM_IPSUM} from '../../constants'

export default () => {
    return {
        layout: Layouts.Rows,
        items: [{
          width: 600,
          defaultItem: {
            as: Alert,
            text: LOREM_IPSUM.slice(0, 140)
          },
          items: [
            {css: 'is-info'},
            {css: 'is-success'},
            {css: 'is-warning'},
            {css: 'is-danger'},
          ]
        }]
    
    }
}