import { List, Layouts } from 'ergo-js-bulma'

const LIST = ['Coffee', 'Tea', 'Milk']

export default () => {
    return {
        layout: Layouts.Content,
        $list: {
            layout: Layouts.Columns,
            defaultItem: {
              as: List,
              html: 'ol',
              items: LIST
            },
            items: [{
                html: 'ul'
            }, {
                type: '1',
            }, {
                type: 'A',
            }, {
                type: 'a',
            }, {
                type: 'I',
            }, {
                type: 'i',
            }]    
        }
    }
}