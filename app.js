import {createProjector} from 'maquette'
import {Html, State, Source, Bindings, Layouts, Section, ContainerLayout, Notification, Menu, MediaLayout,
  Image, Button, Delete, LevelLayout, Icon, Navbar, Content, Events} from './src'

import {ElementsPage, ComponentsPage, AnimationsPage, FormsPage, ExamplesPage} from './pages'

//import '@fortawesome/fontawesome-free/js/fontawesome'
//import '@fortawesome/fontawesome-free/js/all'
import './app.scss'

//fontawesome.config = { autoReplaceSvg: false }


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
      perfAnalysis = setTimeout(doAnalysis, 100)
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
  root.walk(() => stats.components++)

  for (let i in root.sources) {
    root.sources[i].walk(e => {
      stats.entries++
      stats.subscriptions += e.observers.length
      e.observers.forEach(obs => {
        if (!hasRoot(obs.target, root)) stats.hangingNodes++
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
    root.sources.data.set('user', json.data)
//    projector.scheduleRender()
  })

fetch('https://jsonplaceholder.typicode.com/posts')
  .then(response => response.json())
  .then(json => {
//    console.log(json)
    root.sources.data.set('posts', json)
//    projector.scheduleRender()
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

//    const pages = ['posts', 'mainContent', 'countries', 'elements', 'componentsPage', 'elementsPage', 'animationsPage', 'formsPage', 'examplesPage']


    const pageData = {
      posts: menuKey == 'posts',
      mainContent: menuKey == 'sources',
      countries: menuKey == 'countries',
      elements: menuKey == 'elements',
      componentsPage: menuKey == 'components',
      layoutsPage: menuKey == 'layouts',
      animationsPage: menuKey == 'animations',
      formsPage: menuKey == 'forms',
      examplesPage: menuKey == 'examples'
    }

//    setTimeout(() => {
      let t0 = new Date().getTime()
      app.sources.block.mergeWith(pageData)
      // if (menuKey == 'posts') {
      //   app.sources.block.mergeWith({posts: true, mainContent: false, countries: false, elements: false, componentsPage: false, animationsPage: false})
      // }
      // else if (menuKey == 'sources') {
      //   app.sources.block.mergeWith({posts: false, mainContent: true, countries: false, elements: false, componentsPage: false})
      // }
      // else if (menuKey == 'countries') {
      //   app.sources.block.mergeWith({posts: false, mainContent: false, countries: true, elements: false, componentsPage: false})
      // }
      // else if (menuKey == 'elements') {
      //   app.sources.block.mergeWith({posts: false, mainContent: false, countries: false, elements: true, componentsPage: false})
      // }
      // else if (menuKey == 'components') {
      //   app.sources.block.mergeWith({posts: false, mainContent: false, countries: false, elements: false, componentsPage: true})
      // }
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
//    return JSON.stringify(v, null, 2)
    this.opt('text', JSON.stringify(v, null, 2))
  },
  Src: function(v) {
    return {src: v}
  },
  All: function(v) {
    return v
  }
}

const Mutate = {
  Text: function (v) {
    return {text: v}
  },
  Src: function (v) {
    return {src: v}
  },
  DynamicItems: function (v, key) {
    return {$items: key}
  }
}



Events.on('mousedown', function () {
  if (root.sources.dropdown.get()) {
    root.sources.dropdown.set(false)
//    projector.scheduleRender()
  }
})



const context = {
  projector
}

const root = new Html({
  as: 'app',
//  state: rootState,
//  data: rootData,
  sources: {
    app: {
      mainMenu: true,
      mainContent: false,
      posts: true,
      current: 'posts',
      countries: false,
      elements: false,
      componentsPage: false,
      animationsPage: false,
      formsPage: false,
      examplesPage: false
    },
    page: {
    },
    data: {
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
        }, {
          id: 'animations',
          name: 'Animations'
        }, {
          id: 'forms',
          name: 'Forms'
        }, {
          id: 'examples',
          name: 'Examples'
        }]
      }],
      user: {},
      posts: [],
      books: []
    },
    users: {},
    dropdown: true
  },
  sourcesBound: function ({page, data, app}) {

    app.effect('setCurrent', this, (v) => {
      app.set('current', v)
    })

    app.computed('posts', this, v => v.current == 'posts')
    app.computed('elements', this, v => v.current == 'elements')
    app.computed('componentsPage', this, v => v.current == 'components')
    app.computed('layouts', this, v => v.current == 'layouts')
    app.computed('animationsPage', this, v => v.current == 'animations')
    app.computed('formsPage', this, v => v.current == 'forms')
    app.computed('examplesPage', this, v => v.current == 'examples')

  },
//  dynamic: true,
  $navbar: {
    type: Navbar,
    as: 'is-dark is-fixed-top',
//    dynamic: true,
    $brand: {
      type: Navbar.Brand,
      $logo: {
        type: Navbar.Item,
        $content: {
          text: 'Ergo JS',
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
        defaultItem: {
          type: Navbar.Item,
        },
        items: [{
          stateId: 'user',
          stateChanged: function (v) {
            return {text: v.first_name + ' ' + v.last_name}
          }
        }, {
          $content: {
            html: 'img',
            styles: {
              maxWidth: '1.75rem',
              borderRadius: '50%'
            },
            stateId: 'user',
            stateChanged: function (v) {
              return {src: v.avatar}
            }
          }
        }]
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
//      dynamic: true,
      appChanged: function (v, key) {
        return {$components: key}
      },
      components: {
        mainMenu: true
      },
//      dynamic: {
//      blockComponents: Custom.All,
      $mainMenu: {
        type: Menu,
        column: 'is-one-fifth',
        dataId: 'mainMenu',
        dataChanged: function (v, key) {
          return {$items: key}
        },
        defaultItem: {
          layout: Layouts.PassThrough,
          $label: {
            type: Menu.Label,
            dataId: 'name',
            dataChanged: function (v) {
              return {text: v}
            }
          },
          $list: {
            type: Menu.List,
            dataId: 'items',
            dataChanged: function (v, key) {
              return {$items: key}
            },
            appChanged: function (v) {
              this.opt('key') // FIXME этот геттер используется для синхронизации с dataChanged
              this.items.forEach(itm => {
                itm.opt('selected', v.current == itm.options.key)
              })
            },
//             binding: function (v, sources, key) {
// //              if (!key || key == 'state') {
// //                this.opt('$items', 'state')
// //              }
// //              if (!key || key == 'block') {
//                 this.children.forEach(child => {
//                   if (child.index != null) {
//                     child.opt('selected', v.block == child.options.key)
//                   }
//                 })
// //              }
//             },
  //           dynamic: {
  //             state: {id: 'items', items: Custom.All},
  //             block: {
  //               options: function(v) {
  // //              console.log('change [selection]', v, this.children)
  //                 this.children.forEach(child => {
  //   //                console.log(child, child.props.key)
  //                   if (child.index != null) {
  //                     child.opt('selected', v == child.props.key)
  //                   }
  //                 })
  //               }
  //             }
  //           },
            defaultItem: {
              dataChanged: function (v) {
                return {key: v.id, text: v.name}
              },
              // stateOptions: function(v) {
              //   return {text: v.name, key: v.id}
              // },
              onClick: function(e) {
                this.sources.app.setCurrent(this.options.key)
//                console.log('click target', this)
                //Actions.selectMainMenu(this.options.key)
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
//           binding: function (v, sources, key) {
//             if(key && key != 'block') return
// //            debugger
//             console.log('binding main')
//             return {text: Custom.JsonText(v.block)}
//           }
          blockOptions: Custom.JsonText
        }]
//        state: rootState,
//        selectionBinding: Custom.JsonText
      },
      $posts: {
        $list: {
          dynamic: true,
          stateId: 'posts',
          stateChanged: function (v, key) {
            return {$items: key}
          },
//           binding: function (v, sources, key) {
//             console.log('binding posts', key)
// //            if (!key || key == 'state') {
// //              return {$items: 'state'}
// //              debugger
//               this.opt('$items', 'state')
// //            }
//           },
          // defaultItem: {
          //   layout: Layouts.Media,
          //   $content: {
          //     type: Content,
          //     $content: {
          //       html: 'p',
          //       $title: {
          //         html: 'strong',
          //       }
          //     }
          //   }
          // },
          // dynamic: {
          //   state: {id: 'posts', items: Custom.All}
          // },
          defaultItem: {
            layout: Layouts.Media,
            // styles: {
            //   marginBottom: '2rem'
            // },
            $content: {
              type: Content,
              dynamic: true,
              stateChanged: function (v, key) {
//                if (!key || key == 'state') {
//                  console.log('bind single post', v.showComments)
                  this.opt('$components', new Source({comments: v.showComments === true}))

                  if (v.comments == null && !v.loadingComments) {
                    v.loadingComments = true // это значение не связывается с компонентами
                    const loadComments = (id) => {
                      return fetch('https://jsonplaceholder.typicode.com/comments?postId='+id)
                        .then(response => response.json())
                        .then(json => {return {comments: json}})
                    }
                    const effects = [{
                      name: 'fetch',
                      resolver: loadComments,
                      mode: 'pre'
                    }]
                    this.sources[key].wait(effects).emit('mergeWith', {data: v.id})
                      // .then(json => {
                      //   this.sources[key].mergeWith({comments: json, loadingComments: false})
                      //   projector.scheduleRender()
                      // })
                  }
//                }
              },
              stateEffects: function (event) {
//                console.log(event)
                if (event.name == 'fetch:done') {
                  projector.scheduleRender()
                }
              },
              // stateEffects: function (effect) {
              //   if (effect.context) {
              //     let baseName = 'on'+effect.context.substr(0, 1).toUpperCase()+effect.context.substr(1)
              //     if (this.options[baseName] && effect.status == 'wait') {
              //       this.options[baseName].call(this)
              //     }
              //     if (this.options[baseName+'Done'] && effect.status == 'done') {
              //       this.options[baseName+'Done'].call(this)
              //     }
              //   }
//                 if (effect.context == 'fetch_comments') {
//                   if (effect.status == 'wait') {
//                     console.log('start loading', effect.context)
//                   }
//                   else if (effect.status == 'done') {
//                     console.log('end loading', effect.context)
//                     projector.scheduleRender()
//                   }
//                   else {
//                     console.log('effect', effect)
//                   }
// //                  console.log('effect', effect)
//                 }
//              },
              onFetch: function () {
                console.log('fetch begin')
              },
              onFetchDone: function () {
                console.log('fetch end')
              },
              $content: {
                html: 'p',
                $title: {
                  html: 'strong',
                  stateId: 'title',
                  stateChanged: function (v) {
                    return {text: v}
                  }
                  // dynamic: {
                  //   state: {id: 'title', options: Bindings.Text}
                  // }
                },
                $content: {
                  stateId: 'body',
                  stateChanged: function (v) {
                    return {text: v}
                  }
                  // dynamic: {
                  //   state: {id: 'body', options: Bindings.Text}
                  // }
                },
                $actions: {
                  html: 'small',
//                  layout: Layouts.Level,
                  items: [{
                    html: 'a',
                    stateChanged: function (v, key) {
//                      console.log('bind actions', v.showComments)
//                      const post = v.state
                      if (v.comments) {
                        return {text: v.showComments ? 'Hide comments' : ('Show '+v.comments.length+' comments')}
//                        console.log('post', v)
                        // if (v.showComments) {
                        //   this.opt('text', 'Hide comments')
                        // }
                        // else {
                        //   this.opt('text', 'Show '+post.comments.length+' comments')
                        // }
                      }
                    },
//                     stateOptions: function(v) {
//                       if (v.comments) {
// //                        console.log('post', v)
//                         if (v.showComments) {
//                           this.opt('text', 'Hide comments')
//                         }
//                         else {
//                           this.opt('text', 'Show '+v.comments.length+' comments')
//                         }
//                       }
//                     },
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
                stateId: 'comments',
                stateChanged: Mutate.DynamicItems,
                // dynamic: {
                //   state: {id: 'comments', items: Custom.All}
                // },
                defaultItem: {
                  layout: Layouts.Media,
                  $content: {
                    type: Content,
                    $content: {
                      html: 'p',
                      $title: {
                        html: 'strong',
                        stateId: 'name',
                        stateChanged: Mutate.Text
                        // dynamic: {
                        //   state: {id: 'name', options: Bindings.Text}
                        // }
                      },
                      $email: {
                        html: 'small',
                        styles: {marginLeft: '0.5rem'},
                        stateId: 'email',
                        stateChanged: Mutate.Text
                      },
                      $content: {
                        stateId: 'body',
                        stateChanged: Mutate.Text
                      }
                    }
                  }
                }
              }
            },
            $avatar: {
              type: Image,
              as: 'is-64x64',
              mediaLeft: true,
              userChanged: function (v) {
                return {src: v.avatar}
              },
              // user: {
              //   key: 'avatar',
              //   bindTo: 'src'
              // },
//              dynamic: {
              stateChanged: function (post, key) {
                let user = this.sources.users.get(post.userId)

//                console.log('user', user)
                if (user == null) {
                  console.log('start loading user...')
                  this.sources.users.set(post.userId, {loading: true})
                  fetch('https://reqres.in/api/users/'+post.userId)
                    .then(response => response.json())
                    .then(json => {
                      console.log('end loading user.')
                      this.sources.users.set(json.data.id, json.data)
                      projector.scheduleRender()
                    })
                }
                if (this.sources.user == null) {
                  this.opt('$sources', {user: this.sources.users.entry(post.userId)})
                  // FIXME здесь должен вызываться метод this.opt({sources: {user: ?}})
                  // this.options.sources.user = this.sources.users.entry(post.userId)
                  // this.bind(this.options.sources.user, 'user')
                  // if (user) {
                  //   this.rebind(this.sources.user.get(), 'user', this.sources.user)
                  // }
                }

              },
    //             user: {
    //               id: 'avatar',
    //               options: Custom.Src
    //             },
    //             state: {
    //               options: function (v) {
    //                 let user = this.sources.users.get(v.userId)
    // //                console.log('user', user)
    //                 if (user == null/* || !user.id*/) {
    //                   console.log('start loading user...')
    //                   this.sources.users.set(v.userId, {loading: true})
    //                   fetch('https://reqres.in/api/users/'+v.userId)
    //                     .then(response => response.json())
    //                     .then(json => {
    //                       console.log('end loading user.')
    //                       this.sources.users.set(json.data.id, json.data)
    //                       projector.scheduleRender()
    //                     })
    //                 }
    //                 if (this.sources.user == null) {
    //                   this.options.sources.user = this.sources.users.entry(v.userId)
    //                   this.bind(this.options.sources.user, 'user')
    //                   if (user) {
    //                     this.rebind(this.sources.user.get(), 'user', this.sources.user)
    //                   }
    //                 }
    //               }
    //             }
              // }
            }
          }
        }
      },
      $countries: {
        layout: Layouts.Container,
        stateId: 'countries',
        // binding: function (v, sources) {
        //   if (v.state == null) {
        //     console.log('start loading countries.')
        //     sources.state.set({loading: true})
        //     fetch('https://restcountries.eu/rest/v2/all')
        //       .then(response => response.json())
        //       .then(json => {
        //         debugger
        //         console.log('end loading countries.', json)
        //         sources.state.set(json)
        //         projector.scheduleRender()
        //       })
        //   }
        //
        // },
        stateChanged: function(v, key) {
          if (v == null) {
            const loadAllCountries = function () {
              return fetch('https://restcountries.eu/rest/v2/all')
                .then(response => response.json())
            }
            const effects = [{
              name: 'fetch',
              resolver: loadAllCountries,
              mode: 'pre'
            }]
            this.sources[key].wait(effects).emit('set', null)

            // const FetchAllCountries = {
            //   name: 'fetch',
            //   use: () => {
            //     return fetch('https://restcountries.eu/rest/v2/all')
            //     .then(response => response.json())
            //   }
            // }
            //
            // this.domains[dn].when(FetchAllCountries).emit('set').then()

            // console.log('start loading countries.')
            // source.set({loading: true})
            // fetch('https://restcountries.eu/rest/v2/all')
            //   .then(response => response.json())
            //   .then(json => {
            //     console.log('end loading countries.', json)
            //     source.set(json)
            //     projector.scheduleRender()
            //   })
          }
        },
        stateEffects: function (event) {
          console.log(event)
          if (event.name == 'fetch:done') {
            projector.scheduleRender()
          }
        },
        // stateEffects: function (effect) {
        //   if (effect.status == 'wait') {
        //     console.log('begin effect', effect.event, effect.context)
        //   }
        //   else if (effect.status == 'error') {
        //     console.log('failed effect', effect.event, effect.context)
        //   }
        //   else if (effect.status == 'done') {
        //     console.log('end effect', effect.context, 'of', effect.event)
        //     projector.scheduleRender()
        //   }
        //   else {
        //     console.log ('effect', effect)
        //   }
        // },
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
            dynamic: true,
            stateChanged: Mutate.DynamicItems,
//            stateItems: Custom.All,
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
                stateChanged: Mutate.Text
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
                  stateChanged: Mutate.Src
                }
              }]
            }
          }
        }
      },
      $elements: ElementsPage(),
      $componentsPage: ComponentsPage(),
      $animationsPage: AnimationsPage(projector),
      $formsPage: FormsPage(projector),
      $examplesPage: ExamplesPage(projector)
    }
//    }
  }
}, context)

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
  return root.render()
}

document.addEventListener('DOMContentLoaded', function () {
  projector.append(document.body, render);
});
