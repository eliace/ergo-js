import {Html, Domain} from 'chorda-core'
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
  properties () {
    return {
      active: {
        set: function (v) {
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
              min: {},
              max: {},
              current: {},
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
                return list.map((v, i) => {return {page: v, text: v}})
              }
            },
            actions: {
              select: function (v) {
                this.current = v
//                this.set('current', v)
              },
              next: function () {
                this.select( Math.min(this.current+1, this.max) )
//                this.$set('current', Math.min(this.$get('current')+1, this.$get('max')))
              },
              prev: function () {
                this.select( Math.max(this.current-1, this.min) )
//                this.$set('current', Math.max(this.$get('current')-1, this.$get('min')))
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
          this.opt('disabled', v.current == v.min)
        }
      },
      $next: {
        html: 'a',
        css: 'pagination-next',
        text: 'Next',
        onClick: function (e, {__view}) {
          __view.next()
        },
        __viewChanged: function (v) {
          this.opt('disabled', v.current == v.max)
        }
      },
      $list: {
        as: List,
        css: 'pagination-list',
        defaultItem: {
          as: Item,
          __viewChanged: function (v) {
            this.opt('active', this.options.page == v.current)
          },
          onClick: function (e, {__view}) {
            __view.select(this.options.page)
          }
        },
        itemFactory: function (opts, context) {
          return opts.text == '.' ? new Ellipsis() : new Item(opts, context)
        },
        __viewChanged: function (v, s) {
          this.opt('items', s.pages)
        }
      }
    }
  }

  options () {
    return {
      min: {
        set: function (v) {
          this.sources.__view.$set('min', v)
        },
        clean: true
      },
      max: {
        set: function (v) {
          this.sources.__view.$set('max', v)
        },
        clean: true
      },
      current: {
        set: function (v) {
          this.sources.__view.$set('current', v)
        },
        clean: true
      }
    }
  }
}

export default Pagination
