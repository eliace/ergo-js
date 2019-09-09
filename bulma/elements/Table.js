import {Html} from '../../src'


class Row extends Html {

  static defaultOpts = {
    html: 'tr'
  }
}



class Table extends Html {

  static defaultOpts = {
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
          html: 'td'
        }
      }
    }
  }

  static Row = Row
}


export default Table
