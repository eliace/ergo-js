import { Layouts } from 'ergo-js-bulma'

export default () => {
    return {
        layout: Layouts.Content,
        $content: {
          html: 'dl',
          items: [{
            html: 'dt',
            text: 'Users'
          }, {
            html: 'dd',
            text: 'Alice'
          }, {
            html: 'dd',
            text: 'Bob'
          }, {
            html: 'dt',
            text: 'Administrators'
          }, {
            html: 'dd',
            text: 'Charlie'
          }]    
        }
    }
}