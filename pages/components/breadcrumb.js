import {Html, Domain} from '../../src'
import {Layouts, Breadcrumb} from '../../bulma'

export default () => {
  return {
    layout: Layouts.Rows,
    items: [{
      base: Breadcrumb,
      $content: {
        items: ['Alice', 'Bob', 'Charlie'],
        $last: {
          text: 'Dave'
        }
      }
    }, {
      sources: {
        data: new Domain(['Alice', 'Bob', 'Charlie', 'Dave'], {
          properties: {
            list: {
              calc: (v) => {
                return v.map((t, i) => {return {text: t, isActive: i == v.length-1}})
              }
            }
          }
        })
      },
      base: Breadcrumb,
      $content: {
        components: {
          last: false
        },
        dataId: 'list',
        dataChanged: function (v, k) {
          this.opt('$items', k)
        },
        defaultItem: {
          dataChanged: function (v) {
            this.opt('text', v.text)
            this.opt('classes', {'is-active': v.isActive})
          }
        },
      }

    }, {
      sources: {
        data: new Domain(['Alice', 'Bob', 'Charlie', 'Dave'], {
          properties: {
            list: {
              calc: (v) => {return v.slice(0, v.length-1)},
            },
            current: {
              calc: (v) => {return v[v.length-1]}
            }
          }
        })
      },
      base: Breadcrumb,
      $content: {
        dataChanged: function (v, k) {
          this.opt('$items', this.sources[k].$entry('list').$stream(k))
        },
        defaultItem: {
          dataChanged: function (v) {
            this.opt('text', v)
          }
        },
        $last: {
          dataChanged: function (v, k) {
            this.opt('text', this.sources[k].$entry('current').get())
          }
        }
      }
    }, {
      sources: {
        data: ['Alice', 'Bob', 'Charlie', 'Dave']
      },
      base: Breadcrumb,
      $content: {
        dataChanged: function (v, k) {
          this.opt('$items', k)
        },
        defaultItem: {
          dataChanged: function (v, k) {
            this.opt('text', v)
            const isActive = this.domains[k].$source.$lastOf() == v
            this.opt('classes', {'is-active': isActive})
          }
        },
        components: {
          last: false
        }
      }
    }]
  }
}
