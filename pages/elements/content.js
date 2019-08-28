import {Html} from '../../src'
import {Layouts, List, Delete} from '../../bulma'

import {LOREM_IPSUM} from '../constants'

export default () => {
  return {
    layout: Layouts.Rows,
    $list: {
      layout: Layouts.Content,
      defaultItem: {
        base: List,
      },
      items: [{
        base: List,
        html: 'ul',
        items: ['Alice', 'Bob', 'Charlie']
      }, {
        layout: Layouts.Columns,
        defaultItem: {
          base: List,
          html: 'ol'
        },
        items: [{
          _type: '1',
          items: ['Alice', 'Bob', 'Charlie']
        }, {
          _type: 'A',
          items: ['Alice', 'Bob', 'Charlie']
        }, {
          _type: 'a',
          items: ['Alice', 'Bob', 'Charlie']
        }, {
          _type: 'I',
          items: ['Alice', 'Bob', 'Charlie']
        }, {
          _type: 'i',
          items: ['Alice', 'Bob', 'Charlie']
        }]
      }, {
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
      }]
    },
    $typo: {
      layout: Layouts.Content,
      items: [{
        items: [1,2,3,4,5,6].map((itm, i) => {return {html: 'h'+(i+1), text: 'Heading '+(i+1)}})
      }, {
        html: 'blockquote',
        text: LOREM_IPSUM
      }]
    },
  }
}
