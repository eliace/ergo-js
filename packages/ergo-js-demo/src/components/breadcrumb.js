import {Html, Domain} from 'chorda-core'
import {Layouts, Breadcrumb} from 'chorda-bulma'

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
        dataChanged: function (v, s, k) {
          this.opt('items', s.$iterator(k))
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
        dataChanged: function (v, s, k) {//$stream) {
          this.opt('items', s.$entry('list').$iterator(k))//$stream.$substream('list')) // странное решение
        },
        defaultItem: {
          dataChanged: function (v) {
            this.opt('text', v)
          }
        },
        $last: {
          dataChanged: function (v, s) {
            this.opt('text', s.current)
          }
        }
      }
    }, {
      sources: {
        data: ['Alice', 'Bob', 'Charlie', 'Dave']
      },
      as: Breadcrumb,
      $content: {
        dataChanged: function (v, s, k) {
          this.opt('items', s.$iterator(k))
        },
        defaultItem: {
          dataChanged: function (v, s) {
            this.opt('text', v)
            const isActive = s.$source.$lastOf() == v
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
