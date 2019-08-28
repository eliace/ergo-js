import {createProjector} from 'maquette'
import {Html, State, Source, Domain, Bindings, Events, Layout, Config} from './src'
import {Layouts, Section, ContainerLayout, Notification, Menu, MediaLayout,
  Image, Button, Delete, LevelLayout, Icon, Navbar, Content} from './bulma'
import {ElementsPage, ComponentsPage, AnimationsPage, FormsPage, ExamplesPage, LayoutsPage} from './pages'
import Context from './src/react/Context'


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

// fetch('https://jsonplaceholder.typicode.com/posts')
//   .then(response => response.json())
//   .then(json => {
// //    console.log(json)
//     root.sources.data.set('posts', json)
// //    projector.scheduleRender()
//   })

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


/*
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
*/
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


// const renderer = {
//   scheduled: false,
//   scheduleRender: function () {
//     console.log('scheduleRender')
//     if (!this.scheduled) {
//       requestAnimationFrame(() => {
//         render(root.render(), document.body)
//         this.scheduled = false
//       })
//     }
//     this.scheduled = true
//   }
// }


const context = new Context({
//  projector: renderer
})

const root = new Html({
  as: 'app',
//  state: rootState,
//  data: rootData,
  sources: {
    app: new Domain({
      mainMenu: true,
      current: 'elements',
    }),
    page: {
    },
    data: {
      mainMenu: [{
        name: 'Demo',
        items: [{
          id: 'sources',
          name: 'Sources'
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
//    users: {},
    dropdown: true
  },
  allBound: function ({page, data, app}) {

    app.$method('setCurrent', this, (v) => {
      app.set('current', v)
    })

    app.$prop('posts', null, v => v.current == 'posts')
    app.$prop('elements', null, v => v.current == 'elements')
    app.$prop('componentsPage', null, v => v.current == 'components')
    app.$prop('layouts', null, v => v.current == 'layouts')
    app.$prop('animationsPage', null, v => v.current == 'animations')
    app.$prop('formsPage', null, v => v.current == 'forms')
    app.$prop('examplesPage', null, v => v.current == 'examples')
    app.$prop('countriesPage', null, v => v.current == 'countries')
    app.$prop('postsPage', null, v => v.current == 'posts')

    // app.computed('posts', this, v => v.current == 'posts')
    // app.computed('elements', this, v => v.current == 'elements')
    // app.computed('componentsPage', this, v => v.current == 'components')
    // app.computed('layouts', this, v => v.current == 'layouts')
    // app.computed('animationsPage', this, v => v.current == 'animations')
    // app.computed('formsPage', this, v => v.current == 'forms')
    // app.computed('examplesPage', this, v => v.current == 'examples')
    // app.computed('countriesPage', this, v => v.current == 'countries')
    // app.computed('postsPage', this, v => v.current == 'posts')

  },
//  dynamic: true,
  $navbar: {
    base: Navbar,
    as: 'is-dark is-fixed-top',
//    dynamic: true,
    $brand: {
      base: Navbar.Brand,
      $logo: {
        base: Navbar.Item,
        $content: {
          text: 'Ergo JS',
          as: 'has-text-weight-semibold is-uppercase'
        }
      }
    },
    $menu: {
      base: Navbar.Menu,
      $start: {
        base: Navbar.Start,
        defaultItem: {
          base: Navbar.Item,
        },
        items: [{text: 'Home'}, {text: 'Documentation'}]
      },
      $end: {
        base: Navbar.End,
        defaultItem: {
          base: Navbar.Item,
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
//      dynamic: {
//      blockComponents: Custom.All,
      $mainMenu: {
        base: Menu,
        column: 'is-one-fifth',
        dataId: 'mainMenu',
        dataChanged: function (v, key) {
          return {$items: key}
        },
        defaultItem: {
          layout: Layout.passthru,
          $label: {
            base: Menu.Label,
            dataId: 'name',
            dataChanged: function (v) {
              return {text: v}
            }
          },
          $list: {
            base: Menu.List,
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
              }
            }
          }
        }
      },
//       $mainContent: {
//         type: Content,
//         defaultItem: {
//           html: 'pre',
//           $content: {
//             html: 'code',
//           }
//         },
//         items: [{
// //          state: function(v) {return {text: JSON.stringify(v)}}
// //          stateBinding: Custom.JsonText
//         }, {
// //           binding: function (v, sources, key) {
// //             if(key && key != 'block') return
// // //            debugger
// //             console.log('binding main')
// //             return {text: Custom.JsonText(v.block)}
// //           }
//           blockOptions: Custom.JsonText
//         }]
// //        state: rootState,
// //        selectionBinding: Custom.JsonText
//       },
      $content: {
        column: 'is-four-fifths',
        components: false,
        appChanged: function (v, key) {
          return {$components: key}
        },
        $elements: ElementsPage,
        $componentsPage: ComponentsPage,
        $animationsPage: AnimationsPage,
        $formsPage: FormsPage,
        $examplesPage: ExamplesPage,
        $layouts: LayoutsPage
      }
    }
//    }
  }
})

window._app = root


// const render = () => {
//   return root.render()
// }
//
// document.addEventListener('DOMContentLoaded', function () {
//   projector.append(document.body, render);
// });

document.addEventListener('DOMContentLoaded', function () {
  Config.Renderer.append(root, document.getElementById('root'))
//  render(root.render(), document.body)
});
