import {Html, Domain} from '../../src'
import {List} from '../elements'

class Item extends Html {
  config () {
    return {
      html: 'li',
      $content: {
        html: 'a',
        css: 'pagination-link',
      }
    }
  }
  options () {
    return {
      active: {
        initOrSet: function (v) {
          this.$content.opt('classes', {'is-current': !!v})
        }
      }
    }
  }
}

class Ellipsis extends Html {
  config () {
    return {
      html: 'li',
      $content: {
        html: 'span',
        css: 'pagination-ellipsis',
        text: '...'
      }
    }
  }
}

class Pagination extends Html {
  config () {
    return {
      sources: {
        __view: function () {
          return new Domain({
            min: 0,
            max: 0,
            current: 0
          }, {
            properties: {
              pages: (v) => {
                let list = []
                if (v.max - v.min) {
                  list = [v.min]
                  const min = Math.max(v.min+1, v.current - 1)
                  const max = Math.min(v.max-1, v.current + 1)
                  if (min > v.min + 1) {
                    list.push('.')
                  }
                  for (let i = min; i <= max; i++) {
                    list.push(i)
                  }
                  if (max < v.max - 1) {
                    list.push('.')
                  }
                  list.push(v.max)
                }
                return list.map(v => {return {key: v, text: v}})
              }
            },
            actions: {
              select: function (v) {
                this.set('current', v)
              },
              next: function () {
                this.set('current', Math.min(this.get('current')+1, this.get('max')))
              },
              prev: function () {
                this.set('current', Math.max(this.get('current')-1, this.get('min')))
              }
            }
          })
        }
      },
      html: 'nav',
      css: 'pagination',
      $previous: {
        html: 'a',
        css: 'pagination-previous',
        text: 'Previous',
        onClick: function (e, {__view}) {
          __view.prev()
        },
        __viewChanged: function (v) {
          this.opt('disabled', v.current == 0)
        }
      },
      $next: {
        html: 'a',
        css: 'pagination-next',
        text: 'Next',
        onClick: function (e, {__view}) {
          __view.next()
        }
      },
      $list: {
        as: List,
        css: 'pagination-list',
        defaultItem: {
          as: Item,
          __viewChanged: function (v) {
            this.opt('active', this.options.key == v.current)
          },
          onClick: function (e, {__view}) {
            __view.select(this.options.key)
          }
        },
        itemFactory: function (opts, context) {
          return opts.text == '.' ? new Ellipsis() : new Item(opts, context)
        },
        __viewChanged: function (v, $stream) {
          this.opt('items', $stream.__source.pages)
        }
      }
    }
  }

  options () {
    return {
      min: {
        initOrSet: function (v) {
          this.sources.__view.set('min', v)
        },
        clean: true
      },
      max: {
        initOrSet: function (v) {
          this.sources.__view.set('max', v)
        },
        clean: true
      },
      current: {
        initOrSet: function (v) {
          this.sources.__view.set('current', v)
        },
        clean: true
      }
    }
  }
}

export default Pagination
