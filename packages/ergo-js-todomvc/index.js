//import {createProjector} from 'maquette'
import createApp from './src/app'
import {Router} from 'director/build/director'
import { Config } from 'ergo-js-core'
import { Context as ReactRenderer } from 'ergo-js-react'

Config.use(ReactRenderer)

//const projector = createProjector()

const app = createApp()//projector)

const router = new Router({
  '/': () => {
    app.$body.sources.data.set('filter', 'all')
  },
  '/active': () => {
    app.$body.sources.data.set('filter', 'active')
  },
  '/completed': () => {
    app.$body.sources.data.set('filter', 'completed')
  }
})

// const render = () => {
//   return app.render()
// }

// document.addEventListener('DOMContentLoaded', function () {
//   projector.append(document.body, render);
// });

document.addEventListener('DOMContentLoaded', function () {
  Config.Renderer.append(app, document.getElementById('app'))
})

router.init()

//export default () => {
//  return {projector}
//}
