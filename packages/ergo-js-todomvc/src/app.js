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
    $body: {
      scope: {
        data: new Domain({
          filter: 'all',
          todos: [
            {id: 1, text: 'Taste JavaScript'},
            {id: 2, text: 'Buy a unicorn'}
          ]
        }, {
          properties: {
            todos: {
              type: Domain,
            },
            completed: {},
            allCompleted: {
              calc: (v) => v.todos.filter(todo => todo.completed).length == v.todos.length && v.todos.length > 0
            },
            leftCount: {
              calc: (v) => v.todos.filter(todo => !todo.completed).length
            },
            main: {
              calc: (v) => v.todos.length > 0
            },
            footer: {
              calc: (v) => v.todos.length > 0
            },
            clearCompleted: {
              calc: (v) => v.todos.filter(todo => todo.completed).length > 0
            },
            filteredTodos: {
              key: v => v.id,
              entryOfType: {
                properties: {
                  editing: {},
                  completed: {},
                  text: {},
                }
              },
              calc: (v) => {
                if (v.filter == 'all') {
                  return v.todos
                }
                else if (v.filter == 'active') {
                  return v.todos.filter(todo => !todo.completed)
                }
                else if (v.filter == 'completed') {
                  return v.todos.filter(todo => todo.completed)
                }
              }
            }
          }
        }),
        app: {}
      },
      allJoined: function ({app, data}) {
        app.createAction('addTodo', (todo) => {
          data.todos.$add({
            id: uuid(),
            text: todo
          })
        }, this)
        app.createAction('deleteTodo', (id) => {
          data.todos.$value = data.todos.$value.filter(todo => todo.id != id)
          // const todos = [...data.todos.$value]
          // const idx = todos.findIndex(v => v.id == id)
          // todos.splice(idx, 1)
          // data.todos.$value = todos
          // todos.splice()
          // const { todos } = data
          // const idx = todos.$value.findIndex(v => v.id == id)
          // todos.$remove(idx)
        }, this)
        app.createAction('completeAll', (complete) => {
          data.todos.$each(todo => {
            todo.completed = complete
          })
        }, this)
        app.createAction('deleteCompleted', () => {
          data.todos.$value = data.todos.$value.filter(todo => !todo.completed)
          // const todos = data.$entry('todos').get()
          // const onlyActiveTodos = todos.filter(todo => !todo.completed)
          // data.$entry('todos').set(onlyActiveTodos)
        }, this)
      },
      html: 'section',
      css: 'todoapp',
      dataChanged: function (v) {
        this.opt('components', v)
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
          onKeyUp: function (e, {app}) {
            if (e.key == 'Enter') {
              if (e.target.value.trim().length > 0) {
                app.addTodo(e.target.value)
              }
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
            dataChanged: function (v, s) {
              this.opt('checked', s.allCompleted)// data.get('allCompleted'))
            },
            onChange: function (e, {app}) {              
              app.completeAll(e.target.checked)
            }
          },
          $label: {
            html: 'label',
            text: 'Mark all as complete',
            htmlFor: 'toggle-all'
          }
        },
        $todoList: {
          html: 'ul',
          css: 'todo-list',
          filter: 'all',
          dataId: 'filteredTodos',
//          dataEntryId: v => v.id,
          dataChanged: function (v, s, k) {
            console.log('sync todos', s)
            this.opt('items', s.$iterator(k))//data.entry(this.opt('filter')).asStream(k))
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
                  console.log(data)
                  data.completed = e.target.checked
                }
              },
              $content: {
                html: 'label',
                dataChanged: function (v, k) {
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
                  app.deleteTodo(data.get('id'))
                }
              }
            },
            $edit: {
              html: 'input',
              css: 'edit',
              dataJoined: function (data) {
                data.watch(e => e.name == 'changed' && e.ids && 'editing' in e.ids, () => {
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
        dataChanged: function (v) {
          this.opt('components', v)
        },
        $todoCount: {
          html: 'span',
          css: 'todo-count',
          dataId: 'leftCount',
          $count: {
            html: 'strong',
            weight: -10,
            dataChanged: function (v) {
              this.opt('text', v)
            }
          },
          dataChanged: function (v) {
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
            dataChanged: function (v) {
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
          onClick: function (e, {app}) {
            app.deleteCompleted()
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
