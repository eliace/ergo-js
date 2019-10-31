//import {createProjector} from 'maquette'
import {Html, Domain, Layout, Config} from 'ergo-js-core'
import {Layouts, Menu, Navbar, withPortalTarget, withModals, withToasts} from 'ergo-js-bulma'
import {ElementsPage, ComponentsPage, Components2Page, AnimationsPage, FormsPage, ExamplesPage, LayoutsPage, GettingStartedPage, OptionsPage, StructurePage, LayoutPage, DataFlowPage} from './src'
import { Context as ReactRenderer } from 'ergo-js-react'

Config.use(ReactRenderer)

//import '@fortawesome/fontawesome-free/js/fontawesome'
//import '@fortawesome/fontawesome-free/js/all'
import './app.scss'

//fontawesome.config = { autoReplaceSvg: false }

// let perfCounter = 0
// let perfAnalysis = null
//
// const projector = createProjector({
//   performanceLogger(stage, event) {
//     if (stage == 'renderStart') {
//       perfCounter = new Date().getTime()
//     }
//     else if (stage == 'renderDone') {
//       console.log('perf [render]', new Date().getTime() - perfCounter, event)
//       if (perfAnalysis) {
//         clearTimeout(perfAnalysis)
//         perfAnalysis = 0
//       }
//       perfAnalysis = setTimeout(doAnalysis, 100)
//     }
//     else {
// //      console.log(stage, event)
//     }
//
//   }
// })

// function doAnalysis() {
//   const stats = {
//     components: 0,
//     entries: 0,
//     subscriptions: 0,
//     hangingNodes: 0
//   }
//   root.walk(() => stats.components++)
//
//   for (let i in root.sources) {
//     root.sources[i].walk(e => {
//       stats.entries++
//       stats.subscriptions += e.observers.length
//       e.observers.forEach(obs => {
//         if (!hasRoot(obs.target, root)) stats.hangingNodes++
//       })
//     })
//   }
//
//   console.log(stats)
// }


// function hasRoot(c, root) {
//   while (c != null) {
//     if (c == root) {
//       return true
//     }
//     c = c.parent
//   }
//   return false
// }

// const Bindings = {
//   Text: function(v) {this.opt('text', v)},
//   Classes: function(v) {this.opt('classes', v)}
// }

fetch('https://reqres.in/api/users/2')
  .then(response => response.json())
  .then(json => {
    root.sources.data.$set('user', json.data)
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

// Events.on('mousedown', function () {
//   if (root.sources.dropdown.get()) {
//     root.sources.dropdown.set(false)
// //    projector.scheduleRender()
//   }
// })


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

function plug (components, name) {
  return components.filter((c) => c.options.slot == name)[0]
}

function AppLayout (h, html, props, components) {
//  const h = Config.Renderer.h
  const menu = plug(components, 'menu')
  const content = plug(components, 'content')
  return h(html+'.app-layout', props, [
    h('div.app-menu', {key: 'menu'}, menu && menu.render()),
    h('div.app-content', {key: 'content'}, content && content.render())
  ])
}

AppLayout.MENU = 'menu'
AppLayout.CONTENT = 'content'




const root = new Html({
  css: 'app',
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
        name: 'Learn',
        items: [{
          id: 'start',
          name: 'Getting started'
        }, {
          id: 'options',
          name: 'Options'
        }, {
          id: 'componentsAndItems',
          name: 'Components and Items'
        }, {
          id: 'layout',
          name: 'Layout'
        }, {
          id: 'dataFlow',
          name: 'Data cascading'
        }]
      }, {
        name: 'Demo',
        items: [{
          id: 'elements',
          name: 'Elements'
        }, {
          id: 'components',
          name: 'Components'
        }, {
          id: 'components2',
          name: 'Components+'
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
    dropdown: true,
  },
  allJoined: function ({app}) {

    app.createAction('setCurrent', (v) => {
      app.$set('current', v)
    }, this)

    app.$prop('posts', null, v => v.current == 'posts')
    app.$prop('elements', null, v => v.current == 'elements')
    app.$prop('componentsPage', null, v => v.current == 'components')
    app.$prop('layouts', null, v => v.current == 'layouts')
    app.$prop('animationsPage', null, v => v.current == 'animations')
    app.$prop('formsPage', null, v => v.current == 'forms')
    app.$prop('examplesPage', null, v => v.current == 'examples')
    app.$prop('countriesPage', null, v => v.current == 'countries')
    app.$prop('postsPage', null, v => v.current == 'posts')
    app.$prop('components2Page', null, v => v.current == 'components2')

    app.$prop('learnStart', null, v => v.current == 'start')
    app.$prop('learnOptions', null, v => v.current == 'options')
    app.$prop('learnStructure', null, v => v.current == 'componentsAndItems')
    app.$prop('learnLayout', null, v => v.current == 'layout')
    app.$prop('learnDataFlow', null, v => v.current == 'dataFlow')

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
    as: Navbar,
    css: 'is-dark is-fixed-top',
//    dynamic: true,
    $brand: {
      as: Navbar.Brand,
      $logo: {
        as: Navbar.Item,
        $content: {
          text: 'Ergo JS',
          css: 'has-text-weight-semibold is-uppercase'
        }
      }
    },
    $menu: {
      as: Navbar.Menu,
      $start: {
        as: Navbar.Start,
        defaultItem: {
          as: Navbar.Item,
        },
        items: [{text: 'Home'}, {text: 'Documentation'}]
      },
      $end: {
        as: Navbar.End,
        defaultItem: {
          as: Navbar.Item,
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
    // styles: {
    //   padding: '0.75rem'
    // },
    $content: {
      layout: AppLayout,//Layouts.Columns,
//      dynamic: true,
//      dynamic: {
//      blockComponents: Custom.All,
      $mainMenu: {
        as: Menu,
        slot: AppLayout.MENU,
        column: 'is-one-fifth',
        dataId: 'mainMenu',
        dataChanged: function (v, s, k) {
          return {items: s.$iterator(k)}
        },
        defaultItem: {
          layout: Layout.passthru,
          $label: {
            as: Menu.Label,
            dataId: 'name',
            dataChanged: function (v) {
              return {text: v}
            }
          },
          $list: {
            as: Menu.List,
            dataId: 'items',
            dataChanged: function (v, s, k) {
              this.opt('items', s.$iterator(k))
            },
            appChanged: function (v) {
              this.opt('key') // FIXME этот геттер используется для синхронизации с dataChanged
              this.items.forEach(itm => {
                itm.opt('selected', v.current == itm.key)
              })
            },
//             binding: function (v, sources, key) {
// //              if (!key || key == 'state') {
// //                this.opt('items', 'state')
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
              onClick: function(e, {app}) {
                app.actions.setCurrent(this.key)
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
        slot: AppLayout.CONTENT,
        column: 'is-four-fifths',
        components: false,
        appChanged: function (v, s, k) {
          return {components: s.$iterator(k)}
        },
        $elements: ElementsPage,
        $componentsPage: ComponentsPage,
        $animationsPage: AnimationsPage,
        $formsPage: FormsPage,
        $examplesPage: ExamplesPage,
        $layouts: LayoutsPage,
        $components2Page: Components2Page,
        $learnStart: GettingStartedPage,
        $learnOptions: OptionsPage,
        $learnStructure: StructurePage,
        $learnLayout: LayoutPage,
        $learnDataFlow: DataFlowPage,
      }
    }
//    }
  },
  mix: { withModals, withToasts, withPortalTarget }
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
