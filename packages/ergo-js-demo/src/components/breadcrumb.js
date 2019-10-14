import {Html, Domain} from 'ergo-js-core'
import {Layouts, Breadcrumb} from 'ergo-js-bulma'

export default () => {
  return {
    layout: Layouts.Rows,
    items: [{
      as: Breadcrumb,
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
      as: Breadcrumb,
      $content: {
        components: {
          last: false
        },
        dataId: 'list',
        dataChanged: function (v, k) {
          this.opt('items', k)
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
      as: Breadcrumb,
      $content: {
        dataChanged: function (v, $stream) {
          this.opt('items', $stream.$substream('list')) // странное решение
        },
        defaultItem: {
          dataChanged: function (v) {
            this.opt('text', v)
          }
        },
        $last: {
          dataChanged: function (v, s) {
            this.opt('text', s.$props.current)
          }
        }
      }
    }, {
      sources: {
        data: ['Alice', 'Bob', 'Charlie', 'Dave']
      },
      as: Breadcrumb,
      $content: {
        dataChanged: function (v, k) {
          this.opt('items', k)
        },
        defaultItem: {
          dataChanged: function (v, k) {
            this.opt('text', v)
            const isActive = k.__source.source.$lastOf() == v
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
