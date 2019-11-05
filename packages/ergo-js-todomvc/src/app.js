import {Html, Layout, Domain} from 'ergo-js-core'
import {uuid, pluralize} from './utils'

export default () => {

  const AutoFocus = (el) => {
    requestAnimationFrame(() => {
      el.focus()
    })
  }

  // router.on('/', () => {
  //   dataDomain.set('filter', 'all')
  // })
  // router.on('/active', () => {
  //   dataDomain.set('filter', 'active')
  // })
  // router.on('/completed', () => {
  //   dataDomain.set('filter', 'completed')
  // })


  return new Html({
    // Context
    scope: {
      data: new Domain({
//        filter: 'all',
        todos: [
          {id: 1, text: 'Taste JavaScript'},
          {id: 2, text: 'Buy a unicorn'}
        ]
      }, {
        properties: {
          todos: {
            type: Domain,
            entryOfType: {
              properties: {
                completed: Boolean
              }
            }
          }
        },
        actions: {
          addTodo: function (todo) {
            if (todo.trim().length > 0) {
              this.todos.$add({
                id: uuid(),
                text: todo
              })
            }
          },
          deleteCompleted: function () {
            this.todos.$removeIf(todo => todo.completed)
          },
          deleteTodo: function (id) {
            this.todos.$removeIf(todo => todo.id == id)
          },
          completeAll: function (complete) {
            this.todos.$iterator().each(todo => {
              todo.completed = complete
            })
          }
        },
        onChanged: function (e) {
          console.log('todos changed')
        }
      }),
      view: new Domain({
        filter: 'all'
      }, {
        properties: {
          filter: String,
          filteredTodos: {
            key: v => v.id,
            type: Domain,
            entryOfType: {
              properties: {
                editing: Boolean,
                completed: Boolean,
                text: String,
                id: Number
              }
            },
            calc: (v, s) => {
              if (s.filter == 'all') {
                return s.todos.filter(() => true)
              }
              else if (s.filter == 'active') {
                return s.todos.filter(todo => !todo.completed)
              }
              else if (s.filter == 'completed') {
                return s.todos.filter(todo => todo.completed)
              }
            }
          },
          leftCount: {
            calc: (v, {todos}) => todos.filter(todo => !todo.completed).length
          },
          hasCompleted: {
            calc: (v, {todos}) => todos.filter(todo => todo.completed).length > 0
          },
          allCompleted: {
            calc: (v, {todos}) => todos.filter(todo => todo.completed).length == todos.length && todos.length > 0
          },
          hasTodos: {
            calc: (v, {todos}) => todos.length > 0
          }
        }
      })
    },
    allJoined: function ({view, data}) {
      data.$watchProp('todos', (e) => {
        view.$entry('todos')._update('asc')
      })
      view.createProperty('todos', {
        calc: () => {
          return data.todos.$value
        }
      })
      view.$watchProp('filteredTodos', (e) => {
        data._update('asc')
      })

    },

    // Template
    $body: {
      html: 'section',
      css: 'todoapp',
      viewChanged: function (v, s) {
        this.opt('components', {main: s.hasTodos, footer: s.hasTodos})
      },
      $header: {
        html: 'header',
        css: 'header',
        $title: {
          html: 'h1',
          text: 'todos'
        },
        $newTodo: {
          html: 'input',
          css: 'new-todo',
          placeholder: 'What needs to be done?',
          dom: { AutoFocus },
          onKeyUp: function (e, {data}) {
            if (e.key == 'Enter') {
              data.addTodo(e.target.value)
              e.target.value = ''
            }
            else if (e.key == 'Escape') {
              e.target.value = ''
            }
          }
        }
      },
      $main: {
        html: 'section',
        css: 'main',
        $toggleAll: {
          layout: Layout.Passthru,
          $input: {
            html: 'input',
            type: 'checkbox',
            id: 'toggle-all',
            css: 'toggle-all',
            viewChanged: function (v, s) {
              this.opt('checked', s.allCompleted)
            },
            onChange: function (e, {data}) {              
              data.completeAll(e.target.checked)
            }
          },
          $label: {
            html: 'label',
            text: 'Mark all as complete',
            htmlFor: 'toggle-all'
          }
        },
        $todoList: {
          scope: {
            data: (ctx) => ctx.view.$entry('filteredTodos'),
            app: (ctx) => ctx.data
          },
          html: 'ul',
          css: 'todo-list',
          dataChanged: function (v, s) {
            this.opt('items', s.$iterator())
          },
          defaultItem: {
            html: 'li',
            dataChanged: function (v) {
              this.opt('classes', {
                'editing': v.editing,
                'completed': v.completed
              })
            },
            $view: {
              css: 'view',
              $check: {
                html: 'input',
                type: 'checkbox',
                css: 'toggle',
                dataChanged: function (v) {
                  this.opt('checked', v.completed)
                },
                onChange: function (e, {data}) {
                  data.completed = e.target.checked
                }
              },
              $content: {
                html: 'label',
                dataChanged: function (v) {
                  this.opt('text', v.text)
                },
                onDoubleClick: function (e, {data}) {
                  data.editing = true
                }
              },
              $destroy: {
                html: 'button',
                css: 'destroy',
                onClick: function (e, {data, app}) {
                  app.deleteTodo(data.id)
                }
              }
            },
            $edit: {
              html: 'input',
              css: 'edit',
              dataJoined: function (data) {
                // слушаем changed, а не init, т.к. компонент всегда в dom-е
                data.$watchProp('editing', () => {
                    this.eff(AutoFocus)
                }, this)
              },
              dataChanged: function (v) {
                this.opt('defaultValue', v.text)
              },
              onBlur: function (e, {data}) {
                data.editing = false
              },
              onKeyUp: function (e, {data}) {
                if (e.key == 'Enter') {
                  data.text = e.target.value
                  data.editing = false
                }
                else if (e.key == 'Escape') {
                  data.editing = false
                }
              }
            }
          }
        }
      },
      $footer: {
        html: 'footer',
        css: 'footer',
        viewChanged: function (v, s) {
          this.opt('components', {clearCompleted: s.hasCompleted})
        },
        $todoCount: {
          scope: {
            view: (ctx) => ctx.view.$entry('leftCount')
          },
          html: 'span',
          css: 'todo-count',
          $count: {
            html: 'strong',
            weight: -10,
            viewChanged: function (v) {
              this.opt('text', v)
            }
          },
          viewChanged: function (v) {
            this.opt('text', ' ' + pluralize(v, 'item') + ' left')
          }
//          text: ' item left'
        },
        $filters: {
          html: 'ul',
          css: 'filters',
          defaultItem: {
            html: 'li',
            $content: {
              html: 'a'
            },
            viewChanged: function (v) {
//              console.log('FILTER', v)
              this.opt('selected', v.filter == this.opt('key'))
            },
            options: {
              link: {
                set: function (v) {
                  this.$content.opt('href', v)
                }
              },
              selected: {
                set: function (v) {
                  this.$content.opt('classes', {'selected': v})
                }
              }
            }
          },
          items: [{
            text: 'All',
            link: '#/',
            key: 'all'
          }, {
            text: 'Active',
            link: '#/active',
            key: 'active'
          }, {
            text: 'Completed',
            link: '#/completed',
            key: 'completed'
          }]
        },
        $clearCompleted: {
          html: 'button',
          css: 'clear-completed',
          text: 'Clear completed',
          onClick: function (e, {data}) {
            data.deleteCompleted()
          }
        }
      }
    },
    $footer: {
      css: 'info',
      items: [{
        html: 'p',
        text: 'Double-click to edit a todo'
      }, {
        html: 'p',
        text: 'Created by ',
        $link: {
          html: 'a',
          text: 'Eliace',
          href: 'http://ergojs.com',
          weight: 10
        }
      }, {
        html: 'p',
        text: 'Part of ',
        $link: {
          html: 'a',
          text: 'TodoMVC',
          href: 'http://todomvc.com',
          weight: 10
        }
      }]
    }
  })
}
