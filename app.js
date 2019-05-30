import {createProjector} from 'maquette'
import {Html, State, Source, Bindings, Layouts, Section, ContainerLayout, Notification, Menu, MediaLayout,
  Image, Button, Delete, LevelLayout, Icon, Navbar, Content} from './src'

import {ElementsPage} from './pages'

let perfCounter = 0
let perfAnalysis = null

const projector = createProjector({
  performanceLogger(stage, event) {
    if (stage == 'renderStart') {
      perfCounter = new Date().getTime()
    }
    else if (stage == 'renderDone') {
      console.log('perf [render]', new Date().getTime() - perfCounter, event)
      if (perfAnalysis) {
        clearTimeout(perfAnalysis)
        perfAnalysis = 0
      }
      perfAnalysis = setTimeout(doAnalysis, 1500)
    }
    else {
//      console.log(stage, event)
    }

  }
})

function doAnalysis() {
  const stats = {
    components: 0,
    entries: 0,
    subscriptions: 0,
    hangingNodes: 0
  }
  app.walk(() => stats.components++)

  for (let i in app.sources) {
    app.sources[i].walk(e => {
      stats.entries++
      stats.subscriptions += e.observers.length
      e.observers.forEach(obs => {
        if (!hasRoot(obs.target, app)) stats.hangingNodes++
      })
    })
  }

  console.log(stats)
}


function hasRoot(c, root) {
  while (c != null) {
    if (c == root) {
      return true
    }
    c = c.parent
  }
  return false
}

// const Bindings = {
//   Text: function(v) {this.opt('text', v)},
//   Classes: function(v) {this.opt('classes', v)}
// }

fetch('https://reqres.in/api/users/2')
  .then(response => response.json())
  .then(json => {
    app.sources.state.set('user', json.data)
    projector.scheduleRender()
  })

fetch('https://jsonplaceholder.typicode.com/posts')
  .then(response => response.json())
  .then(json => {
//    console.log(json)
    app.sources.state.set('posts', json)
    projector.scheduleRender()
  })

// fetch('https://jsonplaceholder.typicode.com/comments?postId=1')
//   .then(response => response.json())
//   .then(json => {
//     console.log(json)
// //    app.sources.state.set('user', json.data)
//     projector.scheduleRender()
//   })

// fetch('https://jsonplaceholder.typicode.com/users')
//   .then(response => response.json())
//   .then(json => {
//     console.log(json)
// //    app.sources.state.set('posts', json)
//     projector.scheduleRender()
//   })

// fetch('http://libgen.io/json.php?ids=1,2,3,4,5,6&fields=Title,Author,MD5')
//   .then(response => response.json())
//   .then(json => {
// //    console.log(json)
//     app.sources.state.set('books', json.results)
//     projector.scheduleRender()
//   })



const Actions = {
  selectMainMenu: (menuKey) => {
//    console.log('selectMenu', menuKey)
    app.sources.block.set('current', menuKey)

//    setTimeout(() => {
      let t0 = new Date().getTime()
      if (menuKey == 'posts') {
        app.sources.block.mergeWith({posts: true, mainContent: false, countries: false, elements: false})
        // app.sources.block.set('posts', true)
        // app.sources.block.set('mainContent', false)
        // app.sources.block.set('countries', false)
      }
      else if (menuKey == 'sources') {
        app.sources.block.set('posts', false)
        app.sources.block.set('mainContent', true)
        app.sources.block.set('countries', false)
        app.sources.block.set('elements', false)
      }
      else if (menuKey == 'countries') {
        app.sources.block.set('posts', false)
        app.sources.block.set('mainContent', false)
        app.sources.block.set('countries', true)
        app.sources.block.set('elements', false)
      }
      else if (menuKey == 'elements') {
        app.sources.block.mergeWith({posts: false, mainContent: false, countries: false, elements: true})
      }
      let t1 = new Date().getTime()
      console.log(t1-t0)
    //     projector.scheduleRender()
    // }, 10)
//    app.sources.selection.entry('current').set(menuKey)
  }
}

const Custom = {
  ...Bindings,

  JsonText: function(v) {
    this.opt('text', JSON.stringify(v, null, 2))
  },
  Src: function(v) {
    return {src: v}
  },
  All: function(v) {
    return v
  }
}


const app = new Html({
//  state: rootState,
//  data: rootData,
  sources: {
    block: {
      mainMenu: true,
      mainContent: false,
      posts: true,
      current: 'posts',
      countries: false,
      elements: false
    },
    state: {
      mainMenu: [{
        name: 'Demo',
        items: [{
          id: 'posts',
          name: 'Posts'
        }, {
          id: 'sources',
          name: 'Sources'
        }, {
          id: 'countries',
          name: 'Countries'
        }]
      }, {
        name: 'Lib',
        items: [{
          id: 'elements',
          name: 'Elements'
        }, {
          id: 'components',
          name: 'Components'
        }, {
          id: 'layouts',
          name: 'Layouts'
        }]
      }],
      user: {},
      posts: [],
      books: []
    },
    users: {}
  },
//  dynamic: true,
  $navbar: {
    type: Navbar,
    as: 'is-dark',
//    dynamic: true,
    $brand: {
      type: Navbar.Brand,
      $logo: {
        type: Navbar.Item,
        $content: {
          text: 'Books',
          as: 'has-text-weight-semibold is-uppercase'
        }
      }
    },
    $menu: {
      type: Navbar.Menu,
      $start: {
        type: Navbar.Start,
        defaultItem: {
          type: Navbar.Item,
        },
        items: [{text: 'Home'}, {text: 'Documentation'}]
      },
      $end: {
        type: Navbar.End,
        defaultComponent: {
          type: Navbar.Item,
        },
        $avatar: {
          weight: 10,
          $content: {
            html: 'img',
            styles: {
              maxWidth: '1.75rem',
              borderRadius: '50%'
            },
            stateId: 'user',
            stateOptions: function(v) {
              return {src: v.avatar}
            }
          }
        },
        $name: {
          stateId: 'user',
          stateOptions: function (v) {
            return {text: v.first_name + ' ' + v.last_name}
          }
        }
      }
    }
  },

  $main: {
    html: 'main',
    styles: {
      padding: '1rem'
    },
    $content: {
      layout: Layouts.Columns,
      blockComponents: Custom.All,
      $mainMenu: {
        type: Menu,
        column: 'is-one-fifth',
        dynamic: {
          block: {id: 'current'},
          state: {id: 'mainMenu', items: Custom.All}
        },
        defaultItem: {
          layout: Layouts.PassThrough,
          $label: {
            type: Menu.Label,
            dynamic: {
              state: {id: 'name', options: Bindings.Text}// function(v)Binding: Bindings.Text
            }
          },
          $list: {
            type: Menu.List,
            dynamic: {
              state: {id: 'items', items: Custom.All},
              block: {
                options: function(v) {
  //              console.log('change [selection]', v, this.children)
                  this.children.forEach(child => {
    //                console.log(child, child.props.key)
                    if (child.index != null) {
                      child.opt('selected', v == child.props.key)
                    }
                  })
                }
              }
            },
            defaultItem: {
              stateOptions: function(v) {
                return {text: v.name, key: v.id}
              },
              onClick: function(e) {
//                console.log('click target', this)
                Actions.selectMainMenu(this.props.key)
//                console.log(this.sources.selection, app.sources.selection.entry('current'))
//                this.sources.selection.set(this.props.key)
              }
            }
          }
        }
      },
      $mainContent: {
        type: Content,
        defaultItem: {
          html: 'pre',
          $content: {
            html: 'code',
          }
        },
        items: [{
//          state: function(v) {return {text: JSON.stringify(v)}}
//          stateBinding: Custom.JsonText
        }, {
          blockOptions: Custom.JsonText
        }]
//        state: rootState,
//        selectionBinding: Custom.JsonText
      },
      $posts: {
        $list: {
          dynamic: {
            state: {id: 'posts', items: Custom.All}
          },
          defaultItem: {
            layout: Layouts.Media,
            // styles: {
            //   marginBottom: '2rem'
            // },
            $content: {
              type: Content,
              stateComponents: function(v) {
                return {comments: v.showComments === true}
              },
              stateOptions: function(v, source) {

//                 const out = {
// //                  $components: {comments: v.showComments === true}
//                 }
                if (v.comments == null && !v.loadingComments) {
                  v.loadingComments = true // это значение не связывается с компонентами
                  fetch('https://jsonplaceholder.typicode.com/comments?postId='+v.id)
                    .then(response => response.json())
                    .then(json => {
                      source.mergeWith({comments: json, loadingComments: false})
                      projector.scheduleRender()
                    })
                }

//                return out
              },
              // stateComponents: function(v) {
              //   return {
              //     comments: v.showComments
              //   }
              // },
              // state: function(v) {
              //   return {
              //     text: v.name
              //   }
              // },
              // bindings: [
              //   {source: 'state', target: 'components', map: Bindings.Components}
              // ],
              // bindings: {
              //   components: ['state', Bindings.Components]
              // },
              // sources: {
              //   local: {
              //     comments: false
              //   }
              // },
//              stateBindingComponents: Bindings.Components,
//              blockId: 'postComments',
              // stateBindingComponents: function(v) {
              //   const comps = {
              //     content: true,
              //     comments: v.showComments
              //   }
              //
              //   const o = this.options
              //   for (let i in comps) {
              //     if (o.components && o.components[i]) {
              //       const s = comps[i]
              //       if (s && !this['$'+i]) {
              //         this.addComponent(i, o.components[i])//new Options({sources: {[key]: entry}}, o.components[i]))
              //       }
              //       else if (!s && this['$'+i]) {
              //         this.removeComponent(i)
              //       }
              //     }
              //   }
              // },
//               stateBindingComponents: function(...args) {
//                 console.log('dynamic post')
//                 Bindings.Components.call(this, args[0], args[1], args[2], (v, i) => {
//                   if (i == 'comments') {
//
//                   }
//                   return true
// //                  console.log(v)
// //                  if (v.comments)
//                 })
//               },
              /*stateBinding: function(v) {
  //              console.log('update [post]', v)
                if (v.comments == null) {
                  v.comments = {loading: true}
  //                this.sources.state.set('comments', {loading: true})
  //                let postId = this.sources.state.src.get({loading: true})
                  fetch('https://jsonplaceholder.typicode.com/comments?postId='+v.id)
                    .then(response => response.json())
                    .then(json => {
//                      console.log(json)
                      this.sources.state.mergeWith({comments: json, showComments: false})
                      // this.sources.state.set('comments', json)
                      // this.sources.state.set('showComments', false)
                  //    app.sources.state.set('user', json.data)
                      projector.scheduleRender()
                    })
                }
              },*/
              $content: {
                html: 'p',
                $title: {
                  html: 'strong',
                  dynamic: {
                    state: {id: 'title', options: Bindings.Text}
                  }
                },
                $content: {
                  dynamic: {
                    state: {id: 'body', options: Bindings.Text}
                  }
                },
                $actions: {
                  html: 'small',
//                  layout: Layouts.Level,
                  items: [{
                    html: 'a',
                    stateOptions: function(v) {
                      if (v.comments) {
//                        console.log('post', v)
                        if (v.showComments) {
                          this.opt('text', 'Hide comments')
                        }
                        else {
                          this.opt('text', 'Show '+v.comments.length+' comments')
                        }
                      }
                    },
                    onClick: function(e) {
                      this.sources.state.toggle('showComments')
//                      this.sources.state.set('showComments', !this.sources.state.get('showComments'))
                    }
//                    text: 'Show comments',
//                    levelLeft: true
                  }]
                }
              },
              $comments: {
                weight: 10,
                layout: Layouts.PassThrough,
                dynamic: {
                  state: {id: 'comments', items: Custom.All}
                },
                defaultItem: {
                  layout: Layouts.Media,
                  $content: {
                    type: Content,
                    $content: {
                      html: 'p',
                      $title: {
                        html: 'strong',
                        dynamic: {
                          state: {id: 'name', options: Bindings.Text}
                        }
                      },
                      $email: {
                        html: 'small',
                        styles: {marginLeft: '0.5rem'},
                        dynamic: {
                          state: {id: 'email', options: Bindings.Text}
                        }
                      },
                      $content: {
                        dynamic: {
                          state: {id: 'body', options: Bindings.Text}
                        }
                      },
                    },
                  },
                }
              }
            },
            $avatar: {
              type: Image,
              as: 'is-64x64',
              mediaLeft: true,
              // user: {
              //   key: 'avatar',
              //   bindTo: 'src'
              // },
              dynamic: {
                user: {
                  id: 'avatar',
                  options: Custom.Src
                },
                state: {
                  options: function (v) {
                    let user = this.sources.users.get(v.userId)
    //                console.log('user', user)
                    if (user == null/* || !user.id*/) {
                      console.log('start loading user...')
                      this.sources.users.set(v.userId, {loading: true})
                      fetch('https://reqres.in/api/users/'+v.userId)
                        .then(response => response.json())
                        .then(json => {
                          console.log('end loading user.')
                          this.sources.users.set(json.data.id, json.data)
                          projector.scheduleRender()
                        })
                    }
                    if (this.sources.user == null) {
                      this.options.sources.user = this.sources.users.entry(v.userId)
                      this.bind(this.options.sources.user, 'user')
                      if (user) {
                        this.rebind(this.sources.user.get(), 'user', this.sources.user)
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      $countries: {
        layout: Layouts.Container,
        stateId: 'countries',
        stateOptions: function(v, source) {
          if (v == null) {
            console.log('start loading countries.')
            source.set({loading: true})
            fetch('https://restcountries.eu/rest/v2/all')
              .then(response => response.json())
              .then(json => {
                console.log('end loading countries.', json)
                source.set(json)
                projector.scheduleRender()
              })
          }
        },
        $table: {
          html: 'table',
          class: 'table',
          $header: {
            html: 'thead',
            defaultItem: {
              html: 'tr',
              defaultItem: {
                html: 'th'
              }
            },
            items: [{
              items: ['Name', 'Capital', 'Region', 'Area', 'Population', 'Flag']
            }]
          },
          $body: {
            html: 'tbody',
            stateItems: Custom.All,
            defaultItem: {
              html: 'tr',
              // stateBinding: function(v) {
              //   for (let i in this) {
              //     if (i[0] == '$') {
              //       this[i].opt('text', v[i.substr(1)])
              //     }
              //   }
              // },
              // defaultComponent: {
              //   html: 'td'
              // },
              // $name: {},
              // $capital: {},
              // $region: {},
              // $area: {},
              // $population: {}
              defaultItem: {
                html: 'td',
                stateOptions: Bindings.Text
              },
              items: [{
                stateId: 'name'
              }, {
                stateId: 'capital'
              }, {
                stateId: 'region'
              }, {
                stateId: 'area'
              }, {
                stateId: 'population'
              }, {
                $content: {
                  html: 'img',
                  height: '1rem',
                  stateId: 'flag',
                  stateOptions: function(v) {return {src: v}}
                }
              }]
            }
          }
        }
      },
      $elements: ElementsPage()
    }
  }
})

//console.log(app)

//console.log(app.$media.$content.state.get())

// setTimeout(() => {
//   const c = app.child('header.content.item-1')
//   c.opt('html', 'i')
//   c.state.set('test', true)
//   c.data.set('some text')
//   app.$header.state.set('active', false)
// //   let props = JSON.parse(JSON.stringify(app.$header.props))
// //   props.title = 'goodbye'// = {title: 'goodbye'}//.title = 'goodbye'//.opt('title', 'goodbye')
// // //  app.$header.props.classes//'aaa'
// //   app.$header.props = props//JSON.parse(JSON.stringify(app.$header.props))
// //  app.$header.rerender()
//   app.$header.opt('title', 'goodbye')
//   projector.scheduleRender()
// }, 3000)

/*
const c = new Html({
  components: {
    before: {
      text: '[',
      weight: -10
    },
    after: {
      text: ']',
      weight: 10
    },
    content: {
      defaultItem: {
        styles: {
          color: '#ff0000'
        }
      },
      items: [{
        text: 'Alice'
      }, {
        text: 'Bob'
      }, {
        text: 'Charlie',
        styles: {
          color: '#0000ff'
        }
      }]
    },
    button: {
      html: 'button',
      as: 'button is-primary',
      text: 'Press me',
      weight: 11,
      onClick: (e, comp) => {
        c.get('before').opt('text', '(')
        c.$after.opt('text', ')')
      }
    }
  }
})


setTimeout(() => {
  c.$content.add({
    text: 'Dave',
    styles: {
      fontSize: '2rem'
    }
  })
  projector.scheduleRender()
}, 3000)
*/

const render = () => {
  return app.render()
}

document.addEventListener('DOMContentLoaded', function () {
  projector.append(document.body, render);
});
