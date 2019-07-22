import {Html, Layout, Domain} from '../../src'
import {uuid, pluralize} from './utils'

export default (projector) => {

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
      sources: {
        data: new Domain({
          filter: 'all',
          todos: [
            {id: 1, text: 'Taste JavaScript'},
            {id: 2, text: 'Buy a unicorn'}
          ]
        }, {
          properties: {
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
        app: {

        }
      },
      allBound: function ({app, data}) {
        app.$method('addTodo', this, (todo) => {
          data.entry('todos').add({
            id: uuid(),
            text: todo
          })
        })
        app.$method('deleteTodo', this, (id) => {
          const todos = data.entry('todos').get()
          const idx = todos.findIndex(v => v.id == id)
          data.entry('todos').$remove(idx)
        })
        app.$method('completeAll', this, (complete) => {
          data.entry('todos').$each(todo => {
            todo.set('completed', complete)
          })
        })
        app.$method('deleteCompleted', this, () => {
          const todos = data.entry('todos').get()
          const onlyActiveTodos = todos.filter(todo => !todo.completed)
          data.entry('todos').set(onlyActiveTodos)
        })
      },
      html: 'section',
      as: 'todoapp',
      dataChanged: function (v, k) {
        this.opt('$components', k)
      },
      $header: {
        html: 'header',
        as: 'header',
        $title: {
          html: 'h1',
          text: 'todos'
        },
        $newTodo: {
          html: 'input',
          as: 'new-todo',
          placeholder: 'What needs to be done?',
          onAfterCreate: function (el) {
            el.focus()
          },
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
        as: 'main',
        $toggleAll: {
          layout: Layout.Passthru,
          $input: {
            html: 'input',
            _type: 'checkbox',
            id: 'toggle-all',
            as: 'toggle-all',
            dataChanged: function (v, k) {
              this.opt('checked', this.domains[k].get('allCompleted'))
            },
            onChange: function (e, {app}) {
              app.completeAll(e.target.checked)
            }
          },
          $label: {
            html: 'label',
            text: 'Mark all as complete',
            onAfterCreate: function (el) {
              el.setAttribute('for', 'toggle-all')
            }
          }
        },
        $todoList: {
          html: 'ul',
          as: 'todo-list',
          filter: 'all',
          dataId: 'filteredTodos',
          dataEntryId: v => v.id,
          dataChanged: function (v, k) {
            this.opt('$items', k)//data.entry(this.opt('filter')).asStream(k))
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
              as: 'view',
              $check: {
                html: 'input',
                _type: 'checkbox',
                as: 'toggle',
                dataChanged: function (v) {
                  this.opt('checked', v.completed)
                },
                onChange: function (e, {data}) {
                  data.set('completed', e.target.checked)
                }
              },
              $content: {
                html: 'label',
                dataChanged: function (v, k) {
                  this.opt('text', v.text)
                },
                onDoubleClick: function (e, {data}) {
                  data.set('editing', true)
                }
              },
              $destroy: {
                html: 'button',
                as: 'destroy',
                onClick: function (e, {data, app}) {
                  app.deleteTodo(data.get('id'))
                }
              }
            },
            $edit: {
              html: 'input',
              as: 'edit',
              dataChanged: function (v) {
                if (this.vnode) {
                  this.vnode.domNode.value = v.text
                }
                else {
                  this.opt('value', v.text)
                }
                requestAnimationFrame(() => {
                  this.vnode.domNode.focus()
                })
              },
              onBlur: function (e, {data}) {
                data.set('editing', false)
              },
              onKeyUp: function (e, {data}) {
                if (e.key == 'Enter') {
                  data.set('text', e.target.value)
                  data.set('editing', false)
                }
                else if (e.key == 'Escape') {
                  data.set('editing', false)
                }
              }
            }
          }
        }
      },
      $footer: {
        html: 'footer',
        as: 'footer',
        dataChanged: function (v, k) {
          this.opt('$components', k)
        },
        $todoCount: {
          html: 'span',
          as: 'todo-count',
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
          as: 'filters',
          defaultItem: {
            html: 'li',
            $content: {
              html: 'a'
            },
            dataChanged: function (v) {
              console.log('FILTER', v)
              this.opt('selected', v.filter == this.opt('key'))
            },
            options: {
              link: {
                initOrSet: function (v) {
                  this.$content.opt('href', v)
                }
              },
              selected: {
                initOrSet: function (v) {
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
          as: 'clear-completed',
          text: 'Clear completed',
          onClick: function (e, {app}) {
            app.deleteCompleted()
          }
        }
      }
    },
    $footer: {
      as: 'info',
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
  }, {projector})
}
