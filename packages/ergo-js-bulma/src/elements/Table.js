import {Html} from 'chorda-core'


class Row extends Html {
  config () {
    return {
      html: 'tr'
    }
  }
}

class Cell extends Html {
  config () {
    return {
      html: 'td'
    }
  }
}

class Table extends Html {
  config () {
    return {
      html: 'table',
      css: 'table',
      $colgroup: {
        html: 'colgroup',
        defaultItem: {
          html: 'col'
        }
      },
      $head: {
        html: 'thead',
        defaultItem: {
          as: Row,
          defaultItem: {
            html: 'th'
          }
        }
      },
      $body: {
        html: 'tbody',
        defaultItem: {
          as: Row,
          defaultItem: {
            as: Cell
          }
        }
      }  
    }
  }
}

Table.Row = Row
Table.Cell = Cell

export default Table
