import {Html} from '../../src'
import ColumnsLayout from '../layouts/Columns'


export default class Page extends Html {
  static defaultOpts = {
    components: {
      content: {
        css: 'container page',
        layout: ColumnsLayout,
        components: {
          content: {
            col: 'col-md-6 offset-md-3 col-xs-12',
          }
        }
      }
    }
  }
  static OPTIONS = {
    body: {
      mix: function (o, builder) {
        builder.merge({
          components: {
            content: {
              components: {
                content: o
              }
            }
          }
        })
      }
    }
  }
}